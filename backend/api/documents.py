import shutil
from fastapi import APIRouter, Depends, UploadFile, File
from sqlalchemy.orm import Session

from backend.dependencies import get_db
from backend.security.permissions import get_current_user
from backend.services.document_service import transcribe_audio

router = APIRouter(prefix="/api/documents", tags=["Documents"])


@router.post("/audio")
def upload_audio(
    file: UploadFile = File(...),
    session_id: int | None = None,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    file_path = f"uploads/audio/{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    audio_file = transcribe_audio(
        db=db,
        user_id=user.id,
        session_id=session_id,
        file_path=file_path
    )

    return {
        "audio_id": audio_file.id,
        "transcript": audio_file.transcript
    }
