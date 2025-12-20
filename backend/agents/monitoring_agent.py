def detect_risk_flags(text: str) -> list[str]:
    flags = []
    lowered = text.lower()

    if "fake" in lowered or "forged" in lowered:
        flags.append("fraud_keyword")

    if "angry" in lowered or "complaint" in lowered:
        flags.append("customer_distress")

    return flags

