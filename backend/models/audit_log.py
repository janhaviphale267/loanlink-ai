from sqlalchemy import Column, Integer, String, DateTime, Text
from sqlalchemy.sql import func

from backend.database.session import Base


class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(Integer, primary_key=True, index=True)
    actor_role = Column(String(50), nullable=False)   # user | admin | system
    actor_id = Column(Integer, nullable=True)

    action = Column(String(255), nullable=False)
    resource = Column(String(255), nullable=True)
    details = Column(Text, nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
