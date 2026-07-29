import { useState } from "react";

import SellerSelect from "../../components/sales/SellerSelect";
import MoneyInput from "../../components/sales/MoneyInput";

const mockSellers = [
  {
    id: 1,
    name: "Francisco",
  },
  {
    id: 2,
    name: "Cássia",
  },
  {
    id: 3,
    name: "Melqui",
  },
  {
    id: 4,
    name: "Evandro",
  }
];

export default function RegisterSale() {
  const [seller, setSeller] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <section className="mx-auto max-w-3xl">
      <header className="mb-10 text-center">
        <h2 className="text-4xl font-bold text-slate-900">
          Registrar Venda
        </h2>

        <p className="mt-3 text-slate-500">
          Preencha os dados abaixo para registrar uma nova venda.
        </p>
      </header>

      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <SellerSelect
          sellers={mockSellers}
          value={seller}
          onChange={(event) => setSeller(event.target.value)}
        />
      </div>

      <div className="mt-6">
        <MoneyInput
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
        />
      </div>
    </section>
  );
}