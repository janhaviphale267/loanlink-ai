from sqlalchemy.orm import Session

from backend.models.chat import ChatSession, ChatMessage
from backend.agents.master_agent import MasterAgent
from backend.agents.sales_agent import SalesAgent
from backend.agents.verification_agent import VerificationAgent
from backend.agents.underwriting_agent import UnderwritingAgent
from backend.agents.monitoring_agent import detect_sentiment


def process_message(
    db: Session,
    user_id: int,
    session: ChatSession | None,
    user_message: str,
):
    if not session:
        session = ChatSession(user_id=user_id)
        db.add(session)
        db.commit()
        db.refresh(session)

    sentiment = detect_sentiment(user_message)
    session.sentiment = sentiment

    db.add(ChatMessage(
        session_id=session.id,
        sender="user",
        content=user_message
    ))

    agent_type = MasterAgent().route(session.stage)

    if agent_type == "sales":
        reply = SalesAgent().respond(user_message)
        session.stage = "verification"
    elif agent_type == "verification":
        reply = VerificationAgent().respond(user_message)
        session.stage = "underwriting"
    elif agent_type == "underwriting":
        reply = UnderwritingAgent().respond(user_message)
        session.stage = "closure"
    else:
        reply = "Thank you. Our team will contact you shortly."

    db.add(ChatMessage(
        session_id=session.id,
        sender="agent",
        agent_type=agent_type,
        content=reply
    ))

    db.commit()

    return {
        "session_id": session.id,
        "agent": agent_type,
        "reply": reply,
        "stage": session.stage,
        "sentiment": sentiment
    }
