from sqlalchemy.orm import Session

from backend.models.chat import ChatSession, ChatMessage
from backend.agents.master_agent import MasterAgent
from backend.agents.sales_agent import SalesAgent
from backend.agents.verification_agent import VerificationAgent
from backend.agents.underwriting_agent import UnderwritingAgent
from backend.agents.monitoring_agent import detect_risk_flags
from backend.services.audit_service import log_event


def process_message(
    db: Session,
    user_id: int,
    session: ChatSession | None,
    user_message: str,
):
    # Create session if not exists
    if not session:
        session = ChatSession(user_id=user_id)
        db.add(session)
        db.commit()
        db.refresh(session)

    # Store user message
    db.add(
        ChatMessage(
            session_id=session.id,
            sender="user",
            content=user_message,
        )
    )

    # Monitoring / risk flags
    flags = detect_risk_flags(user_message)
    if flags:
        log_event(
            db=db,
            actor_role="system",
            action="risk_flag_detected",
            resource="chat",
            details=",".join(flags),
        )

    # Route via master agent
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
        reply = "Our bank officer will review your case shortly."

    # Store agent reply
    db.add(
        ChatMessage(
            session_id=session.id,
            sender="agent",
            agent_type=agent_type,
            content=reply,
        )
    )

    # Audit log
    log_event(
        db=db,
        actor_role="user",
        actor_id=user_id,
        action="chat_message",
        resource=f"session:{session.id}",
    )

    db.commit()
    db.refresh(session)

    return {
        "session_id": session.id,
        "agent": agent_type,
        "reply": reply,
        "stage": session.stage,
        "risk_flags": flags,
    }


def process_voice_message(
    db: Session,
    user_id: int,
    session_id: int | None,
    transcript: str,
):
    session = None
    if session_id:
        session = db.query(ChatSession).filter(
            ChatSession.id == session_id
        ).first()

    return process_message(
        db=db,
        user_id=user_id,
        session=session,
        user_message=transcript,
    )

