from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.sql import func

from backend.database.session import Base


class ChatSession(Base):
    __tablename__ = "chat_sessions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    stage = Column(String(50), default="discovery")  # discovery, verification, underwriting, closure
    sentiment = Column(String(20), default="neutral")

    created_at = Column(DateTime(timezone=True), server_default=func.now())


class ChatMessage(Base):
    __tablename__ = "chat_messages"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(Integer, ForeignKey("chat_sessions.id"), nullable=False)

    sender = Column(String(20))  # user | agent
    agent_type = Column(String(50), nullable=True)

    content = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
