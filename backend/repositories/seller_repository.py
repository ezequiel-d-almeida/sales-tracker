from sqlalchemy import select
from sqlalchemy.orm import Session

from models import Seller


class SellerRepository:

    def __init__(self, db: Session):
        self.db = db

    def get_all(self) -> list[Seller]:
        stmt = select(Seller).order_by(Seller.name)
        return list(self.db.scalars(stmt).all())

    def get_by_id(self, seller_id: int) -> Seller | None:
        stmt = select(Seller).where(Seller.id == seller_id)
        return self.db.scalar(stmt)