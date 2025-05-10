from sqlalchemy.orm import Session
from ..models.models import Category, Post
from datetime import datetime

# Sample data for initial database population
def init_db(db: Session):
    # Check if we already have data
    if db.query(Category).count() > 0:
        return
    
    # Create sample categories
    tech = Category(name="Technology", description="Articles about programming, software, and tech trends")
    health = Category(name="Health", description="Articles about health, fitness, and wellness")
    finance = Category(name="Finance", description="Articles about personal finance, investing, and economy")
    
    db.add_all([tech, health, finance])
    db.commit()
    
    # Refresh to get IDs
    db.refresh(tech)
    db.refresh(health)
    db.refresh(finance)
    
    # Create sample posts
    posts = [
        Post(
            title="Getting Started with FastAPI",
            content="FastAPI is a modern, high-performance web framework for building APIs with Python based on standard type hints. It's incredibly fast, on par with NodeJS and Go, and offers automatic interactive documentation.",
            image_url="https://fastapi.tiangolo.com/img/logo-margin/logo-teal.png",
            category_id=tech.id
        ),
        Post(
            title="The Benefits of Regular Exercise",
            content="Regular physical activity can improve your muscle strength and boost your endurance. Exercise delivers oxygen and nutrients to your tissues and helps your cardiovascular system work more efficiently.",
            image_url="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            category_id=health.id
        ),
        Post(
            title="Investing 101: Getting Started",
            content="Investing is the act of allocating resources, usually money, with the expectation of generating an income or profit. There are many types of investments, including stocks, bonds, real estate, and more.",
            image_url="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            category_id=finance.id
        ),
    ]
    
    db.add_all(posts)
    db.commit()
    
    print("Database initialized with sample data!")
