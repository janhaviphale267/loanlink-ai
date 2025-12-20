from sqlalchemy.orm import Session

from backend.models.user import User
from backend.security.hashing import hash_password, verify_password


def create_user(
    db: Session,
    email: str,
    username: str,
    password: str,
    full_name: str | None = None,
    is_admin: bool = False
) -> User:
    user = User(
        email=email,
        username=username,
        password_hash=hash_password(password),
        full_name=full_name,
        is_admin=is_admin
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def authenticate_user(
    db: Session,
    username: str,
    password: str
) -> User | None:
    user = db.query(User).filter(User.username == username).first()
    if not user:
        return None
    if not verify_password(password, user.password_hash):
        return None
    return user
