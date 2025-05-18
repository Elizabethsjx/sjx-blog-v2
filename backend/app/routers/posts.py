from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional

from ..database.database import get_db
from ..models.models import Post, User
from ..schemas.schemas import Post as PostSchema, PostCreate, PostUpdate, PostList
from ..routers.auth import get_current_admin # Changed to get_current_admin for CUD operations

router = APIRouter(
    prefix="/api/posts",
    tags=["posts"],
    responses={404: {"description": "Not found"}},
)

@router.get("/", response_model=PostList)
def get_posts(
    skip: int = 0, 
    limit: int = 10, 
    db: Session = Depends(get_db)
):
    posts_query = db.query(Post)
    total_posts = posts_query.count()
    posts = posts_query.order_by(Post.updated_at.desc()).offset(skip).limit(limit).all() # Added order_by
    return PostList(items=posts, total=total_posts)

# Removed /me endpoint as it's no longer needed per new requirements

@router.get("/{post_id}", response_model=PostSchema)
def get_post(post_id: int, db: Session = Depends(get_db)):
    post = db.query(Post).filter(Post.id == post_id).first()
    if post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    return post

@router.post("/", response_model=PostSchema, status_code=status.HTTP_201_CREATED)
def create_post(post: PostCreate, db: Session = Depends(get_db), current_admin: User = Depends(get_current_admin)):
    # Only admins can create posts. The author is the admin creating it.
    db_post = Post(**post.dict(), author_id=current_admin.id)
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post

@router.put("/{post_id}", response_model=PostSchema)
def update_post(post_id: int, post: PostUpdate, db: Session = Depends(get_db), current_admin: User = Depends(get_current_admin)):
    # Only admins can update posts
    db_post = db.query(Post).filter(Post.id == post_id).first()
    if db_post is None:
        raise HTTPException(status_code=status.HTTP_404, detail="Post not found")

    # current_admin dependency already ensures the user is an admin
    
    # Update only the fields that were provided
    update_data = post.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_post, key, value)
    
    db.commit()
    db.refresh(db_post)
    return db_post

@router.delete("/{post_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_post(post_id: int, db: Session = Depends(get_db), current_admin: User = Depends(get_current_admin)):
    # Only admins can delete posts
    db_post = db.query(Post).filter(Post.id == post_id).first()
    if db_post is None:
        raise HTTPException(status_code=status.HTTP_404, detail="Post not found")

    # current_admin dependency already ensures the user is an admin
    
    db.delete(db_post)
    db.commit()
    return None
