from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

from backend.dependencies import get_db
from backend.security.permissions import get_current_user
from backend.models.chat import ChatSession
from backend.services.chat_service import process_message

router = APIRouter(prefix="/api/chat", tags=["Chat"])


class ChatRequest(BaseModel):
    message: str
    session_id: int | None = None


@router.post("/message")
def chat(
    data: ChatRequest,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    session = None
    if data.session_id:
        session = db.query(ChatSession).filter(
            ChatSession.id == data.session_id
        ).first()

    return process_message(
        db=db,
        user_id=user.id,
        session=session,
        user_message=data.message
    )
