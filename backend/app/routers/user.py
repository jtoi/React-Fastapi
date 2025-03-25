from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from ..auth.auth_handler import get_current_active_user,permission_required
from ..database import get_db
from ..schemas.user import UserResponse
from ..models import User

router = APIRouter()

@router.get("/users/me/", response_model=UserResponse, dependencies=[permission_required("view_me")])
async def read_users_me(current_user: User = Depends(get_current_active_user)):
    return current_user


@router.get("/users/", response_model=List[UserResponse], dependencies=[permission_required("view_users")])
async def read_users(db: Session = Depends(get_db), skip: int = 0, limit: int = 100):
    # Fetch all users with optional pagination (skip and limit)
    users = db.query(User).offset(skip).limit(limit).all()
    return users