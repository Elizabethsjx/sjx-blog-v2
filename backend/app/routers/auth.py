from fastapi import APIRouter, Depends, HTTPException, status, Response, Request
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from sqlalchemy.orm import Session
from typing import Any, Optional
from datetime import timedelta
from jose import jwt, JWTError
import requests
import json

from ..database.database import get_db
from ..models.models import User
from ..schemas.schemas import UserCreate, User as UserSchema, Token, PasswordResetRequest, PasswordReset, GoogleAuthRequest
from ..core.security import create_access_token, create_refresh_token, verify_password, get_password_hash, generate_password_reset_token, verify_password_reset_token
from ..core.config import settings

router = APIRouter(prefix="/api/auth", tags=["auth"])

# OAuth2 scheme for token extraction
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

# Helper functions
def get_user_by_email(db: Session, email: str) -> Optional[User]:
    return db.query(User).filter(User.email == email).first()

def authenticate_user(db: Session, email: str, password: str) -> Optional[User]:
    user = get_user_by_email(db, email)
    if not user or not user.password_hash:
        return None
    if not verify_password(password, user.password_hash):
        return None
    return user

def get_current_user(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise credentials_exception
    return user

# Dependency for admin roles
def get_current_admin(current_user: User = Depends(get_current_user)) -> User:
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You don't have enough permissions"
        )
    return current_user

# Routes
@router.post("/register", response_model=UserSchema)
def register_user(user_in: UserCreate, db: Session = Depends(get_db)) -> Any:
    """
    Register a new user with email and password
    """
    user = get_user_by_email(db, email=user_in.email)
    if user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )
    
    # Create new user
    db_user = User(
        email=user_in.email,
        name=user_in.name,
        is_admin=user_in.is_admin,
    )
    
    # Set password if provided
    if user_in.password:
        db_user.password_hash = get_password_hash(user_in.password)
    
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    return db_user

@router.post("/login", response_model=Token)
def login_for_access_token(
    response: Response,
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
) -> Any:
    """
    Login with username (email) and password
    """
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Create access token
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(user.id, expires_delta=access_token_expires)
    
    # Create refresh token
    refresh_token = create_refresh_token(user.id)
    
    # Set httpOnly cookie with refresh token
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        secure=True,  # Set to False in development
        samesite="lax",
        max_age=settings.REFRESH_TOKEN_EXPIRE_DAYS * 24 * 60 * 60,
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "expires_in": settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
    }

@router.post("/refresh", response_model=Token)
def refresh_token(
    response: Response,
    request: Request,
    db: Session = Depends(get_db),
) -> Any:
    """
    Refresh access token using refresh token
    """
    # Get refresh token from cookie
    refresh_token = request.cookies.get("refresh_token")
    if not refresh_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Refresh token missing",
        )
    
    # Verify refresh token
    try:
        payload = jwt.decode(refresh_token, settings.SECRET_KEY, algorithms=["HS256"])
        user_id: str = payload.get("sub")
        token_type = payload.get("type")
        
        if user_id is None or token_type != "refresh":
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid refresh token",
            )
            
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token",
        )
    
    # Get user
    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
        )
    
    # Create new access token
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(user.id, expires_delta=access_token_expires)
    
    # Create new refresh token
    new_refresh_token = create_refresh_token(user.id)
    
    # Set httpOnly cookie with new refresh token
    response.set_cookie(
        key="refresh_token",
        value=new_refresh_token,
        httponly=True,
        secure=True,  # Set to False in development
        samesite="lax",
        max_age=settings.REFRESH_TOKEN_EXPIRE_DAYS * 24 * 60 * 60,
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "expires_in": settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
    }

@router.post("/logout")
def logout(response: Response) -> Any:
    """
    Logout by clearing the refresh token cookie
    """
    response.delete_cookie(
        key="refresh_token",
        httponly=True,
        secure=True,
        samesite="lax",
    )
    return {"message": "Successfully logged out"}

@router.get("/me", response_model=UserSchema)
def get_me(current_user: User = Depends(get_current_user)) -> Any:
    """
    Get current user information
    """
    return current_user

@router.post("/password-reset", response_model=dict)
def request_password_reset(
    reset_request: PasswordResetRequest,
    db: Session = Depends(get_db),
) -> Any:
    """
    Request a password reset
    """
    user = get_user_by_email(db, reset_request.email)
    if not user:
        # Don't reveal that the user doesn't exist
        return {"message": "Password reset email has been sent"}
    
    # Generate password reset token
    reset_token = generate_password_reset_token(user.email)
    
    # Store the token in the database
    user.reset_token = reset_token
    user.reset_token_expires = timedelta(hours=settings.EMAIL_RESET_TOKEN_EXPIRE_HOURS)
    db.commit()
    
    # Here you would typically send an email with the reset token
    # For now, we'll just return the token in the response
    # In production, you should use a proper email service
    
    return {"message": "Password reset email has been sent", "token": reset_token}

@router.post("/reset-password", response_model=dict)
def reset_password(
    reset_data: PasswordReset,
    db: Session = Depends(get_db),
) -> Any:
    """
    Reset password using token
    """
    email = verify_password_reset_token(reset_data.token)
    if not email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid token",
        )
    
    user = get_user_by_email(db, email)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )
    
    # Reset the user's password
    user.password_hash = get_password_hash(reset_data.new_password)
    user.reset_token = None
    user.reset_token_expires = None
    db.commit()
    
    return {"message": "Password has been reset successfully"}

# Google OAuth routes
@router.get("/google/auth-url")
def get_google_auth_url() -> Any:
    """
    Get Google OAuth authorization URL
    """
    # Construct Google OAuth URL
    auth_url = "https://accounts.google.com/o/oauth2/auth"
    redirect_uri = settings.GOOGLE_REDIRECT_URI
    scope = "openid email profile"
    
    params = {
        "client_id": settings.GOOGLE_CLIENT_ID,
        "redirect_uri": redirect_uri,
        "response_type": "code",
        "scope": scope,
        "access_type": "offline",
        "prompt": "consent",
    }
    
    # Build URL with params
    from urllib.parse import urlencode
    auth_url = f"{auth_url}?{urlencode(params)}"
    
    return {"auth_url": auth_url}

@router.post("/google/login", response_model=Token)
def google_login(
    auth_request: GoogleAuthRequest,
    response: Response,
    db: Session = Depends(get_db),
) -> Any:
    """
    Login or register user with Google OAuth
    """
    # Exchange code for token
    try:
        token_url = "https://oauth2.googleapis.com/token"
        token_data = {
            "code": auth_request.code,
            "client_id": settings.GOOGLE_CLIENT_ID,
            "client_secret": settings.GOOGLE_CLIENT_SECRET,
            "redirect_uri": auth_request.redirect_uri,
            "grant_type": "authorization_code",
        }
        
        token_response = requests.post(token_url, data=token_data)
        token_response.raise_for_status()
        token_info = token_response.json()
        
        # Get user info from Google
        id_token = token_info.get("id_token")
        if not id_token:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Could not validate Google credentials",
            )
            
        # Validate id_token and extract user info
        # In a production app, you should properly validate the token
        # For simplicity, we'll just extract the user info from the token payload
        
        # Decode JWT without verifying (not secure, but simple for demo)
        from jose import jws
        header, payload, signature = id_token.split('.')
        # Add padding to make base64 decoding work
        payload += '=' * (4 - len(payload) % 4)
        payload_data = json.loads(jws.base64url_decode(payload).decode('utf-8'))
        
        # Extract user info
        email = payload_data.get("email")
        name = payload_data.get("name")
        picture = payload_data.get("picture")
        
        if not email:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email not found in Google token",
            )
        
        # Check if user exists
        user = get_user_by_email(db, email)
        if not user:
            # Create new user
            user = User(
                email=email,
                name=name or email.split('@')[0],
                profile_picture=picture,
                is_admin=False,  # New users via Google are not admins by default
            )
            db.add(user)
            db.commit()
            db.refresh(user)
        
        # Create access token
        access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(user.id, expires_delta=access_token_expires)
        
        # Create refresh token
        refresh_token = create_refresh_token(user.id)
        
        # Set httpOnly cookie with refresh token
        response.set_cookie(
            key="refresh_token",
            value=refresh_token,
            httponly=True,
            secure=True,  # Set to False in development
            samesite="lax",
            max_age=settings.REFRESH_TOKEN_EXPIRE_DAYS * 24 * 60 * 60,
        )
        
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "expires_in": settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        }
        
    except requests.RequestException as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Failed to authenticate with Google: {str(e)}",
        )
