from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routers import posts, categories, auth
from .database.database import engine
from .models.models import Base
from .core.config import settings

# Create the database tables
Base.metadata.create_all(bind=engine)

# Create FastAPI app
app = FastAPI(title=settings.PROJECT_NAME)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:8000"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(posts.router)
app.include_router(categories.router)
app.include_router(auth.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Blog API"}

@app.get("/api/health")
def health_check():
    return {"status": "healthy"}
