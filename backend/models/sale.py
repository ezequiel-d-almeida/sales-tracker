from typing import TYPE_CHECKING

from datetime import datetime
from decimal import Decimal

from sqlalchemy import DateTime
from sqlalchemy import ForeignKey
from sqlalchemy import Numeric
from sqlalchemy import String
from sqlalchemy import func
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship

from database import Base

if TYPE_CHECKING:
    from .seller import Seller




class Sale(Base):
    """
    Modelo que representa a tabela de vendas.
    """

    __tablename__ = "sales"

    id: Mapped[int] = mapped_column(
        primary_key=True,
    )

    seller_id: Mapped[int] = mapped_column(
        ForeignKey("sellers.id", ondelete="RESTRICT"),
        nullable=False,
    )

    amount: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        nullable=False,
    )

    payment_method: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    seller: Mapped["Seller"] = relationship(
        back_populates="sales",
    )

    def __repr__(self) -> str:
        return (
            "Sale("
            f"id={self.id}, "
            f"seller_id={self.seller_id}, "
            f"amount={self.amount}, "
            f"payment_method='{self.payment_method}'"
            ")"
        )