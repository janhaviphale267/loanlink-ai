from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.dependencies import get_db
from backend.security.permissions import require_admin
from backend.models.audit_log import AuditLog

router = APIRouter(prefix="/api/admin", tags=["Admin"])


@router.get("/audit-logs")
def get_audit_logs(
    db: Session = Depends(get_db),
    _=Depends(require_admin),
):
    return db.query(AuditLog).order_by(AuditLog.created_at.desc()).all()

