from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.sql import func

from backend.database.session import Base


class AudioFile(Base):
    __tablename__ = "audio_files"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    session_id = Column(Integer, ForeignKey("chat_sessions.id"), nullable=True)

    file_path = Column(String(500), nullable=False)
    transcript = Column(Text, nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
