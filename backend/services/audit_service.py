from sqlalchemy.orm import Session
from backend.models.audit_log import AuditLog


def log_event(
    db: Session,
    actor_role: str,
    action: str,
    actor_id: int | None = None,
    resource: str | None = None,
    details: str | None = None,
):
    log = AuditLog(
        actor_role=actor_role,
        actor_id=actor_id,
        action=action,
        resource=resource,
        details=details,
    )
    db.add(log)
    db.commit()
