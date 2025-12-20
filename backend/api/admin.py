from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.dependencies import get_db
from backend.models.user import User
from backend.security.permissions import require_admin

router = APIRouter(prefix="/api/admin", tags=["Admin"])


@router.get("/users")
def list_users(
    _: User = Depends(require_admin),
    db: Session = Depends(get_db)
):
    users = db.query(User).all()
    return [
        {
            "id": u.id,
            "email": u.email,
            "username": u.username,
            "is_admin": u.is_admin,
            "is_active": u.is_active
        }
        for u in users
    ]
