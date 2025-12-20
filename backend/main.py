from fastapi import FastAPI

from backend.config import get_settings
from backend.api.auth import router as auth_router
from backend.api.users import router as users_router
from backend.api.admin import router as admin_router
from backend.api.loans import router as loans_router
from backend.api.chat import router as chat_router

settings = get_settings()

app = FastAPI(title=settings.APP_NAME, debug=settings.DEBUG)

app.include_router(auth_router)
app.include_router(users_router)
app.include_router(admin_router)
app.include_router(loans_router)
app.include_router(chat_router)


@app.get("/health")
def health():
    return {"status": "ok"}

