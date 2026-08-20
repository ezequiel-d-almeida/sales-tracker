import { useEffect, useState } from "react";

import SellerSelect from "./components/sales/SellerSelect";
import MoneyInput from "./components/sales/MoneyInput";
import PaymentMethod from "./components/sales/PaymentMethod";
import SubmitSaleButton from "./components/sales/SubmitSaleButton";
import LastSaleCard from "./components/sales/LastSaleCard";

import {
  createSale,
  getLastSale,
  getSellers,
} from "./services/api";

export default function App() {
  const [seller, setSeller] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [sellers, setSellers] = useState([]);
  const [lastSale, setLastSale] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadInitialData() {
      try {
        setError("");

        const [sellersResponse, lastSaleResponse] = await Promise.all([
          getSellers(),
          getLastSale(),
        ]);

        setSellers(sellersResponse.data);
        setLastSale(lastSaleResponse.data);
      } catch (err) {
        if (!err.response || err.response.status === 502 || err.response.status === 503) {
          setError("Servidor indisponivel. Verifique se o SalesTracker e o PostgreSQL estao iniciados.");
        } else {
          setError("Nao foi possivel carregar os dados iniciais.");
        }
        console.error(err);
      } finally {
        setIsFetching(false);
      }
    }

    loadInitialData();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setIsLoading(true);
      setError("");

      const response = await createSale({
        seller_id: Number(seller),
        amount: Number(amount),
        payment_method: paymentMethod,
      });

      setLastSale(response.data);

      setSeller("");
      setAmount("");
      setPaymentMethod("");
    } catch (err) {
      if (!err.response || err.response.status === 502 || err.response.status === 503) {
        setError("Servidor indisponivel. A venda nao foi registrada.");
      } else {
        setError("Nao foi possivel registrar a venda.");
      }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
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
                disabled={isFetching}
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
                isLoading={isLoading}
                disabled={
                  isFetching ||
                  !seller ||
                  !amount ||
                  !paymentMethod
                }
              />

              {error && (
                <p className="text-sm font-medium text-red-600">
                  {error}
                </p>
              )}

            </div>

          </form>

          <LastSaleCard sale={lastSale} />

        </div>

      </div>

    </main>
  );
}
