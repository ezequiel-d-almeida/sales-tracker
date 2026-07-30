import { Clock3, CreditCard, User } from "lucide-react";

export default function LastSaleCard({
  sale,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="mb-5 text-lg font-semibold text-slate-800">
        Última venda registrada
      </h3>

      {!sale ? (
        <p className="text-slate-500">
          Nenhuma venda registrada nesta sessão.
        </p>
      ) : (
        <div className="space-y-4">

          <div className="flex items-center gap-3">
            <User size={18} />
            <span>{sale.seller}</span>
          </div>

          <div className="flex items-center gap-3">
            <CreditCard size={18} />
            <span>
              {sale.paymentMethod}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Clock3 size={18} />
            <span>
              {sale.time}
            </span>
          </div>

          <div className="text-3xl font-bold text-blue-600">
            {sale.amount}
          </div>

        </div>
      )}
    </div>
  );
}