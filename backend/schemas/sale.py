from datetime import datetime
from decimal import Decimal
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field, field_validator

from schemas.seller import SellerResponse


class SaleCreate(BaseModel):
    seller_id: int = Field(gt=0)
    amount: Decimal = Field(gt=0)
    payment_method: Literal["CASH", "PIX", "DEBIT", "CREDIT"]

    @field_validator("amount")
    @classmethod
    def limit_amount_precision(cls, value: Decimal) -> Decimal:
        return value.quantize(Decimal("0.01"))


class SaleResponse(BaseModel):
    id: int
    seller: SellerResponse
    amount: Decimal
    paymentMethod: str
    paymentMethodLabel: str
    time: str
    createdAt: datetime

    model_config = ConfigDict(from_attributes=True)