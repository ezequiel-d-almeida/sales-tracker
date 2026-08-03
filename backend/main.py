from datetime import datetime
from decimal import Decimal, InvalidOperation
from pathlib import Path
from typing import Literal

import json

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, field_validator


BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "data"
SALES_FILE = DATA_DIR / "sales.json"

SELLERS = [
    {"id": 1, "name": "Cássia"},
    {"id": 2, "name": "Evandro"},
    {"id": 3, "name": "Francisco"},
    {"id": 4, "name": "Melqui"},
]

PAYMENT_METHODS = {
    "CASH": "Dinheiro",
    "PIX": "Pix",
    "DEBIT": "Débito",
    "CREDIT": "Crédito",
}


class SaleCreate(BaseModel):
    seller_id: int = Field(gt=0)
    amount: Decimal = Field(gt=0)
    payment_method: Literal["CASH", "PIX", "DEBIT", "CREDIT"]

    @field_validator("amount")
    @classmethod
    def limit_amount_precision(cls, value: Decimal) -> Decimal:
        try:
            return value.quantize(Decimal("0.01"))
        except InvalidOperation as exc:
            raise ValueError("Valor invalido.") from exc


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


def ensure_data_file() -> None:
    DATA_DIR.mkdir(exist_ok=True)
    if not SALES_FILE.exists():
        SALES_FILE.write_text("[]", encoding="utf-8")


def read_sales() -> list[dict]:
    ensure_data_file()
    try:
        return json.loads(SALES_FILE.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        return []


def write_sales(sales: list[dict]) -> None:
    ensure_data_file()
    SALES_FILE.write_text(
        json.dumps(sales, ensure_ascii=True, indent=2),
        encoding="utf-8",
    )


def find_seller(seller_id: int) -> dict | None:
    return next((seller for seller in SELLERS if seller["id"] == seller_id), None)


@app.get("/api/health")
def health_check() -> dict:
    return {"status": "ok"}


@app.get("/api/sellers")
def list_sellers() -> list[dict]:
    return SELLERS


@app.get("/api/sales")
def list_sales() -> list[dict]:
    return read_sales()


@app.get("/api/sales/last")
def get_last_sale() -> dict | None:
    sales = read_sales()
    if not sales:
        return None
    return sales[-1]


@app.post("/api/sales", status_code=201)
def create_sale(payload: SaleCreate) -> dict:
    seller = find_seller(payload.seller_id)
    if seller is None:
        raise HTTPException(status_code=404, detail="Vendedor nao encontrado.")

    sales = read_sales()
    now = datetime.now()

    sale = {
        "id": len(sales) + 1,
        "seller": seller,
        "amount": f"{payload.amount:.2f}",
        "paymentMethod": payload.payment_method,
        "paymentMethodLabel": PAYMENT_METHODS[payload.payment_method],
        "time": now.strftime("%H:%M"),
        "createdAt": now.isoformat(timespec="seconds"),
    }

    sales.append(sale)
    write_sales(sales)

    return sale
