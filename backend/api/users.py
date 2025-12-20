from fastapi import APIRouter, Depends
from pydantic import BaseModel

from backend.models.user import User
from backend.security.permissions import get_current_user

router = APIRouter(prefix="/api/users", tags=["Users"])


class UserResponse(BaseModel):
    id: int
    email: str
    username: str
    full_name: str | None
    is_admin: bool

    class Config:
        from_attributes = True


@router.get("/me", response_model=UserResponse)
def get_me(current_user: User = Depends(get_current_user)):
    return current_user
