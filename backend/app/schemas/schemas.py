from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

# Category schemas
class CategoryBase(BaseModel):
    name: str
    description: Optional[str] = None

class CategoryCreate(CategoryBase):
    pass

class Category(CategoryBase):
    id: int
    
    class Config:
        orm_mode = True
        from_attributes = True

# Post schemas
class PostBase(BaseModel):
    title: str
    content: str
    image_url: Optional[str] = None
    category_id: Optional[int] = None

class PostCreate(PostBase):
    pass

class PostUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    image_url: Optional[str] = None
    category_id: Optional[int] = None

class Post(PostBase):
    id: int
    created_at: datetime
    updated_at: datetime
    category: Optional[Category] = None
    
    class Config:
        orm_mode = True
        from_attributes = True

# Response schemas for lists of items
class PostList(BaseModel):
    posts: List[Post]
    
    class Config:
        orm_mode = True
        from_attributes = True

class CategoryList(BaseModel):
    categories: List[Category]
    
    class Config:
        orm_mode = True
        from_attributes = True
