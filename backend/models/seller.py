from typing import TYPE_CHECKING

from sqlalchemy import String
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship

from database import Base

if TYPE_CHECKING:
    from .sale import Sale




class Seller(Base):
    """
    Modelo que representa a tabela de vendedores.
    """

    __tablename__ = "sellers"

    id: Mapped[int] = mapped_column(
        primary_key=True,
    )

    name: Mapped[str] = mapped_column(
        String(100),
        unique=True,
        nullable=False,
    )

    sales: Mapped[list["Sale"]] = relationship(
        back_populates="seller"
    )

    def __repr__(self) -> str:
        return (
            f"Seller("
            f"id={self.id}, "
            f"name='{self.name}'"
            f")"
        )