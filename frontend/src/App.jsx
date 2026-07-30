import { useState } from "react";

import SellerSelect from "./components/sales/SellerSelect";
import MoneyInput from "./components/sales/MoneyInput";
import PaymentMethod from "./components/sales/PaymentMethod";
import SubmitSaleButton from "./components/sales/SubmitSaleButton";
import LastSaleCard from "./components/sales/LastSaleCard";

import sellers from "./data/sellers";

export default function App() {
  const [seller, setSeller] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [lastSale, setLastSale] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();

    const sellerName =
      sellers.find((item) => item.id === Number(seller))?.name || "";

    const sale = {
      seller: sellerName,
      amount,
      paymentMethod,
      time: new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    console.log(sale);

    setLastSale(sale);

    setSeller("");
    setAmount("");
    setPaymentMethod("");
  }

  return (
    <main className="min-h-screen px-6 py-12">

      <div className="mx-auto w-full max-w-5xl">

        <header className="mb-10">

          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-600">
            Central AutoPeças
          </p>

          <h1 className="mt-2 text-4xl font-bold text-slate-900">
            Registro de Vendas
          </h1>

          <p className="mt-2 text-slate-500">
            Registre rapidamente as vendas realizadas durante o expediente.
          </p>

        </header>

        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
          >

            <div className="space-y-6">

              <SellerSelect
                sellers={sellers}
                value={seller}
                onChange={(event) => setSeller(event.target.value)}
              />

              <MoneyInput
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
              />

              <PaymentMethod
                value={paymentMethod}
                onChange={setPaymentMethod}
              />

              <SubmitSaleButton
                disabled={
                  !seller ||
                  !amount ||
                  !paymentMethod
                }
              />

            </div>

          </form>

          <LastSaleCard sale={lastSale} />

        </div>

      </div>

    </main>
  );
}