def calculate_emi(principal: float, annual_rate: float, months: int) -> float:
    monthly_rate = annual_rate / (12 * 100)
    if monthly_rate == 0:
        return principal / months
    return (
        principal
        * monthly_rate
        * (1 + monthly_rate) ** months
        / ((1 + monthly_rate) ** months - 1)
    )


def calculate_risk_score(income: float, loan_amount: float) -> int:
    ratio = loan_amount / income
    if ratio < 0.2:
        return 80
    if ratio < 0.4:
        return 60
    return 40
