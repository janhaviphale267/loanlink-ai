from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from backend.database.session import Base


class LoanApplication(Base):
    __tablename__ = "loan_applications"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    loan_amount = Column(Float, nullable=False)
    loan_purpose = Column(String(255), nullable=False)
    tenure_months = Column(Integer, nullable=False)

    annual_income = Column(Float, nullable=False)
    employment_type = Column(String(100), nullable=False)

    status = Column(String(50), default="draft")  
    risk_score = Column(Integer, nullable=True)
    interest_rate = Column(Float, nullable=True)
    emi = Column(Float, nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    user = relationship("User", backref="loan_applications")
