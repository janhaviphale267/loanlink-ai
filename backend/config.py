from functools import lru_cache
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # =========================
    # APP
    # =========================
    APP_NAME: str = "LoanLink AI"
    DEBUG: bool = True

    # =========================
    # DATABASE
    # =========================
    DB_ENGINE: str = "mysql"  # mysql | sqlite

    SQLITE_DB_PATH: str = "loanlink.db"

    MYSQL_HOST: str = "localhost"
    MYSQL_PORT: int = 3306
    MYSQL_USER: str = "root"
    MYSQL_PASSWORD: str = ""
    MYSQL_DB: str = "loanlink_db"

    # =========================
    # SECURITY
    # =========================
    JWT_SECRET_KEY: str = ""
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    # =========================
    # OPENAI
    # =========================
    OPENAI_API_KEY: str = ""

    class Config:
        env_file = ".env"
        extra = "ignore"


@lru_cache
def get_settings() -> Settings:
    return Settings()

