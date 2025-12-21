from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.dependencies import get_db
from backend.models.loan import LoanApplication
from backend.security.permissions import get_current_user

# (keep existing imports & router)

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

    # Graceful defaults (until evaluation runs)
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
