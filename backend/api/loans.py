from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.dependencies import get_db
from backend.models.loan import LoanApplication
from backend.security.permissions import get_current_user, require_admin
from backend.services.loan_service import (
    create_loan_application,
    evaluate_loan,
)

# ✅ ROUTER MUST BE DEFINED BEFORE USE
router = APIRouter(prefix="/api/loans", tags=["Loans"])


# -------------------------
# APPLY FOR LOAN
# -------------------------
@router.post("/apply")
def apply_loan(
    data: dict,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    return create_loan_application(
        db=db,
        user_id=user.id,
        loan_amount=data.get("loan_amount"),
        loan_purpose=data.get("loan_purpose"),
        tenure_months=data.get("tenure_months"),
        annual_income=data.get("annual_income"),
        employment_type=data.get("employment_type"),
    )


# -------------------------
# LIST USER LOANS
# -------------------------
@router.get("/")
def list_my_loans(
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    return db.query(LoanApplication).filter(
        LoanApplication.user_id == user.id
    ).all()


# -------------------------
# LOAN SUMMARY (UI)
# -------------------------
@router.get("/{loan_id}/summary")
def loan_summary(
    loan_id: int,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    """
    Returns a compact loan summary for UI consumption.
    Safe even if underwriting is pending.
    """
    loan = db.query(LoanApplication).filter(
        LoanApplication.id == loan_id,
        LoanApplication.user_id == user.id,
    ).first()

    if not loan:
        raise HTTPException(status_code=404, detail="Loan not found")

    interest_rate = getattr(loan, "interest_rate", None)
    emi = getattr(loan, "emi", None)
    credit_score = getattr(loan, "credit_score", None)
    risk_level = getattr(loan, "risk_level", None)

    return {
        "amount": f"₹{int(loan.loan_amount):,}",
        "tenure": f"{int(loan.tenure_months / 12)} Years",
        "rate": f"{interest_rate}%" if interest_rate else "—",
        "emi": f"₹{int(emi):,}" if emi else "—",
        "creditScore": credit_score if credit_score else "—",
        "riskLevel": risk_level if risk_level else "Pending",
    }


# -------------------------
# ADMIN EVALUATION
# -------------------------
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
