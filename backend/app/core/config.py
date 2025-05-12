import os
from typing import Optional, Dict, Any, List
from pydantic import BaseModel, AnyHttpUrl, validator
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Settings(BaseModel):
    API_V1_STR: str = "/api"
    PROJECT_NAME: str = "Blog API"
    
    # CORS
    BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = []
    
    @validator("BACKEND_CORS_ORIGINS", pre=True)
    def assemble_cors_origins(cls, v: str | List[str]) -> List[str] | str:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",")]
        elif isinstance(v, (list, str)):
            return v
        raise ValueError(v)
    
    # Authentication
    SECRET_KEY: str = os.getenv("SECRET_KEY", "your-secret-key-change-in-production")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))
    REFRESH_TOKEN_EXPIRE_DAYS: int = int(os.getenv("REFRESH_TOKEN_EXPIRE_DAYS", "7"))
    
    # Google OAuth
    GOOGLE_CLIENT_ID: str = os.getenv("GOOGLE_CLIENT_ID", "")
    GOOGLE_CLIENT_SECRET: str = os.getenv("GOOGLE_CLIENT_SECRET", "")
    GOOGLE_REDIRECT_URI: str = os.getenv("GOOGLE_REDIRECT_URI", "http://localhost:8000/api/auth/google/callback")
    
    # Database
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./data/blog.db")
    
    # Email Settings for Password Reset
    EMAILS_FROM_EMAIL: Optional[str] = os.getenv("EMAILS_FROM_EMAIL", "")
    EMAILS_FROM_NAME: Optional[str] = os.getenv("EMAILS_FROM_NAME", "")
    EMAIL_RESET_TOKEN_EXPIRE_HOURS: int = 48
    EMAIL_TEMPLATES_DIR: str = "app/email-templates"
    EMAIL_SMTP_HOST: Optional[str] = os.getenv("EMAIL_SMTP_HOST", "")
    EMAIL_SMTP_PORT: Optional[int] = int(os.getenv("EMAIL_SMTP_PORT", "587"))
    EMAIL_SMTP_USER: Optional[str] = os.getenv("EMAIL_SMTP_USER", "")
    EMAIL_SMTP_PASSWORD: Optional[str] = os.getenv("EMAIL_SMTP_PASSWORD", "")
    EMAIL_SMTP_TLS: bool = True
    
    class Config:
        case_sensitive = True


settings = Settings()
