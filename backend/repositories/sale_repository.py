from sqlalchemy import select
from sqlalchemy.orm import Session, joinedload
from sqlalchemy.orm import joinedload

from models import Sale

class SaleRepository:

    def __init__(self, db: Session):
        self.db = db

    def create(self, sale: Sale) -> Sale:
        self.db.add(sale)
        self.db.commit()
        self.db.refresh(sale)

        return self.get_by_id(sale.id)

    def get_all(self) -> list[Sale]:
        stmt = (
            select(Sale)
            .options(joinedload(Sale.seller))
            .order_by(Sale.created_at.desc())
        )

        return list(self.db.scalars(stmt).all())

    def get_last(self) -> Sale | None:
        stmt = (
            select(Sale)
            .options(joinedload(Sale.seller))
            .order_by(Sale.created_at.desc())
            .limit(1)
        )

        return self.db.scalar(stmt)

    def get_by_id(self, sale_id: int) -> Sale | None:
        stmt = (
            select(Sale)
            .options(joinedload(Sale.seller))
            .where(Sale.id == sale_id)
        )

        return self.db.scalar(stmt)