from fastapi import FastAPI

from backend.config import get_settings
from backend.api.auth import router as auth_router
from backend.api.users import router as users_router
from backend.api.admin import router as admin_router

settings = get_settings()

app = FastAPI(
    title=settings.APP_NAME,
    debug=settings.DEBUG
)

app.include_router(auth_router)
app.include_router(users_router)
app.include_router(admin_router)


@app.get("/health")
def health():
    return {"status": "ok"}


