def detect_sentiment(message: str) -> str:
    lowered = message.lower()
    if "angry" in lowered or "frustrated" in lowered:
        return "negative"
    if "thanks" in lowered or "good" in lowered:
        return "positive"
    return "neutral"
