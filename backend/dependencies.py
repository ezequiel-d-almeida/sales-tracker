from collections.abc import Generator

from sqlalchemy.orm import Session

from database import SessionLocal


def get_db() -> Generator[Session, None, None]:
    """
    Abre uma sessão com o banco para cada requisição
    e garante seu fechamento ao final.
    """

    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()