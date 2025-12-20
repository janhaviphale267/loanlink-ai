from sqlalchemy.orm import Session

from backend.models.loan import LoanApplication
from backend.utils.calculations import calculate_emi, calculate_risk_score


def create_loan_application(
    db: Session,
    user_id: int,
    loan_amount: float,
    loan_purpose: str,
    tenure_months: int,
    annual_income: float,
    employment_type: str,
) -> LoanApplication:
    loan = LoanApplication(
        user_id=user_id,
        loan_amount=loan_amount,
        loan_purpose=loan_purpose,
        tenure_months=tenure_months,
        annual_income=annual_income,
        employment_type=employment_type,
        status="submitted",
    )
    db.add(loan)
    db.commit()
    db.refresh(loan)
    return loan


def evaluate_loan(db: Session, loan: LoanApplication) -> LoanApplication:
    risk_score = calculate_risk_score(loan.annual_income, loan.loan_amount)

    if risk_score >= 70:
        interest = 10.5
        loan.status = "approved"
    elif risk_score >= 50:
        interest = 14.0
        loan.status = "conditional"
    else:
        interest = None
        loan.status = "rejected"

    if interest:
        loan.risk_score = risk_score
        loan.interest_rate = interest
        loan.emi = calculate_emi(loan.loan_amount, interest, loan.tenure_months)

    db.commit()
    db.refresh(loan)
    return loan
