from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from backend.security.jwt import create_access_token
from backend.dependencies import get_db

router = APIRouter(prefix="/api/auth", tags=["auth"])

# ------------------ Schemas ------------------

class LoginRequest(BaseModel):
    username: str
    password: str

class UserOut(BaseModel):
    id: str
    name: str
    roles: list[str]

class LoginResponse(BaseModel):
    token: str
    user: UserOut

# ------------------ Routes ------------------

@router.post("/login", response_model=LoginResponse)
def login(data: LoginRequest):
    """
    TEMP AUTH:
    Accepts any username/password and returns JWT
    """
    user = UserOut(
        id="user-1",
        name=data.username,
        roles=["user"]
    )

    token = create_access_token(
        data={"sub": user.id, "roles": user.roles}
    )

    return {
        "token": token,
        "user": user
    }


@router.get("/me")
def me():
    """
    TEMP USER INFO
    """
    return {
        "user": {
            "id": "user-1",
            "name": "Demo User",
            "roles": ["user"]
        }
    }
