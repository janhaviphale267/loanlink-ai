import os
from sqlalchemy.orm import Session
from openai import OpenAI

from backend.models.document import AudioFile
from backend.config import get_settings

settings = get_settings()

client = OpenAI(api_key=settings.OPENAI_API_KEY)

UPLOAD_DIR = "uploads/audio"
os.makedirs(UPLOAD_DIR, exist_ok=True)


def transcribe_audio(
    db: Session,
    user_id: int,
    session_id: int | None,
    file_path: str
) -> AudioFile:
    with open(file_path, "rb") as audio:
        transcript = client.audio.transcriptions.create(
            file=audio,
            model="whisper-1"
        ).text

    audio_file = AudioFile(
        user_id=user_id,
        session_id=session_id,
        file_path=file_path,
        transcript=transcript
    )

    db.add(audio_file)
    db.commit()
    db.refresh(audio_file)

    return audio_file
