from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from backend.dependencies import get_db
from backend.models.loan import LoanApplication
from backend.security.permissions import get_current_user, require_admin
from backend.services.loan_service import (
    create_loan_application,
    evaluate_loan,
)

router = APIRouter(prefix="/api/loans", tags=["Loans"])


class LoanCreateRequest(BaseModel):
    loan_amount: float
    loan_purpose: str
    tenure_months: int
    annual_income: float
    employment_type: str


@router.post("/apply")
def apply_loan(
    data: LoanCreateRequest,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    return create_loan_application(
        db=db,
        user_id=user.id,
        loan_amount=data.loan_amount,
        loan_purpose=data.loan_purpose,
        tenure_months=data.tenure_months,
        annual_income=data.annual_income,
        employment_type=data.employment_type,
    )


@router.get("/")
def list_my_loans(
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    return db.query(LoanApplication).filter(
        LoanApplication.user_id == user.id
    ).all()


@router.post("/{loan_id}/evaluate")
def evaluate(
    loan_id: int,
    db: Session = Depends(get_db),
    _=Depends(require_admin),
):
    loan = db.query(LoanApplication).filter(
        LoanApplication.id == loan_id
    ).first()
    if not loan:
        raise HTTPException(status_code=404, detail="Loan not found")
    return evaluate_loan(db, loan)
