from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime


class CategoryBase(BaseModel):
    name: str
    description: Optional[str] = None


class CategoryCreate(CategoryBase):
    pass


class Category(CategoryBase):
    id: int
    
    class Config:
        from_attributes = True


class PostBase(BaseModel):
    title: str
    content: str
    image_url: Optional[str] = None
    category_id: Optional[int] = None


class PostCreate(PostBase):
    pass


class PostUpdate(PostBase):
    title: Optional[str] = None
    content: Optional[str] = None


class Post(PostBase):
    id: int
    created_at: datetime
    updated_at: datetime
    category: Optional[Category] = None
    author_id: Optional[int] = None
    
    class Config:
        from_attributes = True


# User schemas
class UserBase(BaseModel):
    email: EmailStr
    name: str
    is_admin: bool = False


class UserCreate(UserBase):
    password: Optional[str] = None  # Optional for OAuth users


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    profile_picture: Optional[str] = None


class User(UserBase):
    id: int
    profile_picture: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class UserWithPosts(User):
    posts: List[Post] = []
    
    class Config:
        from_attributes = True


# Token schemas
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int
    refresh_token: Optional[str] = None


class TokenData(BaseModel):
    sub: str  # subject (user id)
    exp: int  # expiration time
    is_admin: bool = False


# Password reset schemas
class PasswordResetRequest(BaseModel):
    email: EmailStr


class PasswordReset(BaseModel):
    token: str
    new_password: str = Field(..., min_length=8)


# Google OAuth schemas
class GoogleAuthRequest(BaseModel):
    code: str
    redirect_uri: str
