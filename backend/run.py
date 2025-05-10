import uvicorn
from app.main import app
from app.database.database import SessionLocal, engine
from app.database.init_db import init_db

def initialize_database():
    db = SessionLocal()
    try:
        init_db(db)
    finally:
        db.close()

if __name__ == "__main__":
    # Initialize the database with sample data
    initialize_database()
    
    # Run the FastAPI app with Uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
