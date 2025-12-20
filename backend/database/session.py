from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy.engine.url import URL

from backend.config import get_settings

settings = get_settings()

Base = declarative_base()

if settings.DB_ENGINE == "sqlite":
    engine = create_engine(
        f"sqlite:///{settings.SQLITE_DB_PATH}",
        connect_args={"check_same_thread": False},
        echo=settings.DEBUG
    )

else:
    database_url = URL.create(
        drivername="mysql+pymysql",
        username=settings.MYSQL_USER,
        password=settings.MySQL@1810,  
        host=settings.MYSQL_HOST,
        port=settings.MYSQL_PORT,
        database=settings.MYSQL_DB,
    )

    engine = create_engine(
        database_url,
        pool_pre_ping=True,
        echo=settings.DEBUG
    )

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)
