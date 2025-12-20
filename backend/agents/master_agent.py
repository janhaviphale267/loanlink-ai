from typing import Dict, List, Tuple
from datetime import datetime


class MasterAgent:
    """
    Central orchestrator for LoanLink AI conversations
    """

    def __init__(self):
        self.sessions: Dict[str, List[dict]] = {}

    def start_session(self, session_id: str):
        self.sessions[session_id] = []

    def handle_message(self, session_id: str, message: str) -> Tuple[str, float]:
        if session_id not in self.sessions:
            self.start_session(session_id)

        # store user message
        self.sessions[session_id].append({
            "id": f"u-{len(self.sessions[session_id])}",
            "from_": "user",
            "text": message,
            "ts": int(datetime.utcnow().timestamp() * 1000),
        })

        # TEMP AI LOGIC (replace with OpenAI later)
        ai_text = self._generate_reply(message)
        confidence = 0.82

        # store AI message
        self.sessions[session_id].append({
            "id": f"a-{len(self.sessions[session_id])}",
            "from_": "ai",
            "text": ai_text,
            "ts": int(datetime.utcnow().timestamp() * 1000),
            "meta": {"confidence": confidence}
        })

        return ai_text, confidence

    def get_conversation(self, session_id: str) -> List[dict]:
        return self.sessions.get(session_id, [])

    def _generate_reply(self, message: str) -> str:
        msg = message.lower()

        if "loan" in msg:
            return "I can help you with loan eligibility, documents, and status. What would you like to check?"
        if "eligibility" in msg:
            return "To check eligibility, I’ll need income details and existing liabilities."
        if "document" in msg:
            return "You can upload documents from the Upload section. I’ll verify them for you."
        return "Got it. Please tell me more so I can assist you better."
