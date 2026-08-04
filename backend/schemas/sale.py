from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel, ConfigDict


class SaleCreate(BaseModel):
    seller_id: int
    amount: Decimal
    payment_method: str


class SaleResponse(BaseModel):
    id: int
    seller: str
    amount: Decimal
    paymentMethod: str
    paymentMethodLabel: str
    time: str
    createdAt: datetime

    model_config = ConfigDict(from_attributes=True)