from fastapi import APIRouter, Depends
from pydantic import BaseModel
from typing import List, Optional
from uuid import uuid4
from datetime import datetime

from backend.dependencies import get_db
from backend.agents.master_agent import MasterAgent

router = APIRouter(prefix="/api/chat", tags=["chat"])

agent = MasterAgent()

# ---------------- Schemas ----------------

class StartSessionResponse(BaseModel):
    sessionId: str


class ChatMessageRequest(BaseModel):
    sessionId: str
    message: str


class ChatMessage(BaseModel):
    id: str
    from_: str
    text: str
    ts: int
    meta: Optional[dict] = None


class ChatResponse(BaseModel):
    message: ChatMessage


# ---------------- Routes ----------------

@router.post("/session", response_model=StartSessionResponse)
def start_session():
    session_id = f"session-{uuid4().hex}"
    agent.start_session(session_id)
    return {"sessionId": session_id}


@router.post("/message", response_model=ChatResponse)
def send_message(payload: ChatMessageRequest):
    """
    Receives user message and returns AI reply
    """
    reply_text, confidence = agent.handle_message(
        session_id=payload.sessionId,
        message=payload.message
    )

    ai_message = ChatMessage(
        id=f"m-{uuid4().hex}",
        from_="ai",
        text=reply_text,
        ts=int(datetime.utcnow().timestamp() * 1000),
        meta={"confidence": confidence}
    )

    return {"message": ai_message}


@router.get("/conversation/{session_id}", response_model=List[ChatMessage])
def get_conversation(session_id: str, limit: int = 100):
    """
    Returns conversation history
    """
    history = agent.get_conversation(session_id)
    return history[-limit:]


