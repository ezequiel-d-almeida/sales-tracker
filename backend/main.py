from datetime import datetime
from decimal import Decimal

from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from dependencies import get_db
from models import Sale
from repositories import SaleRepository, SellerRepository

from schemas import SaleCreate, SaleResponse, SellerResponse

PAYMENT_METHODS = {
    "CASH": "Dinheiro",
    "PIX": "Pix",
    "DEBIT": "Débito",
    "CREDIT": "Crédito",
}




app = FastAPI(title="Sales Tracker API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def serialize_sale(sale: Sale) -> dict:
    return {
        "id": sale.id,
        "seller": {
            "id": sale.seller.id,
            "name": sale.seller.name,
        },
        "amount": f"{sale.amount:.2f}",
        "paymentMethod": sale.payment_method,
        "paymentMethodLabel": PAYMENT_METHODS[sale.payment_method],
        "time": sale.created_at.strftime("%H:%M"),
        "createdAt": sale.created_at.isoformat(timespec="seconds"),
    }


@app.get("/api/health")
def health_check() -> dict:
    return {"status": "ok"}

@app.get(
        "/api/sellers",
        response_model=list[SellerResponse],
)
def list_sellers(
    db: Session = Depends(get_db),
) -> list[dict]:

    repository = SellerRepository(db)

    sellers = repository.get_all()

    return [
        {
            "id": seller.id,
            "name": seller.name,
        }
        for seller in sellers
    ]


@app.get(
        "/api/sales",
         response_model=list[SaleResponse],
)
def list_sales(
    db: Session = Depends(get_db),
) -> list[dict]:
    repository = SaleRepository(db)

    sales = repository.get_all()

    return [
        serialize_sale(sale)
        for sale in sales
    ]

@app.get(
    "/api/sales/last",
    response_model=SaleResponse | None,
)
def get_last_sale(
    db: Session = Depends(get_db),
) -> dict | None:
    repository = SaleRepository(db)

    sale = repository.get_last()

    if sale is None:
        return None

    return serialize_sale(sale)

@app.post(
        "/api/sales", 
        status_code=201,
        response_model=SaleResponse,
)
def create_sale(
    payload: SaleCreate,
    db: Session = Depends(get_db),
) -> dict:

    seller_repository = SellerRepository(db)
    sale_repository = SaleRepository(db)

    seller = seller_repository.get_by_id(payload.seller_id)

    if seller is None:
        raise HTTPException(
            status_code=404,
            detail="Vendedor não encontrado.",
        )

    sale = Sale(
        seller_id=payload.seller_id,
        amount=payload.amount,
        payment_method=payload.payment_method,
    )

    sale = sale_repository.create(sale)

    return serialize_sale(sale)