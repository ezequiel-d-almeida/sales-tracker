from sqlalchemy import select

from database import SessionLocal
from models import Seller


SELLERS = [
    "Cássia",
    "Evandro",
    "Francisco",
    "Melqui",
]


def seed() -> None:
    db = SessionLocal()

    try:
        existing = {
            seller.name
            for seller in db.scalars(select(Seller)).all()
        }

        new_sellers = [
            Seller(name=name)
            for name in SELLERS
            if name not in existing
        ]

        if new_sellers:
            db.add_all(new_sellers)
            db.commit()
            print(f"{len(new_sellers)} vendedor(es) inserido(s).")
        else:
            print("Tabela de vendedores já está populada.")

    finally:
        db.close()


if __name__ == "__main__":
    seed()