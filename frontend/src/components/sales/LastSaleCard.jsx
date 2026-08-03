import {
  Clock3,
  CreditCard,
  DollarSign,
  User,
} from "lucide-react";

export default function LastSaleCard({ sale }) {
  const sellerName = sale?.seller?.name || sale?.seller;
  const paymentMethod = sale?.paymentMethodLabel || sale?.paymentMethod;

  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <h2 className="text-lg font-semibold text-slate-900">
        Última venda
      </h2>

      <p className="mt-1 mb-6 text-sm text-slate-500">
        Informações da venda registrada nesta sessão.
      </p>

      {!sale ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
          <p className="text-sm text-slate-500">
            Nenhuma venda registrada.
          </p>
        </div>
      ) : (
        <div className="space-y-5">

          <div className="flex items-center gap-3">
            <User
              size={18}
              className="text-blue-600"
            />

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Vendedor
              </p>

              <p className="font-medium text-slate-800">
                {sellerName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <CreditCard
              size={18}
              className="text-blue-600"
            />

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Pagamento
              </p>

              <p className="font-medium text-slate-800">
                {paymentMethod}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Clock3
              size={18}
              className="text-blue-600"
            />

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Horário
              </p>

              <p className="font-medium text-slate-800">
                {sale.time}
              </p>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-5">

            <div className="flex items-center gap-2 text-blue-600">
              <DollarSign size={20} />

              <span className="text-xs uppercase tracking-wide">
                Valor
              </span>
            </div>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              R$ {sale.amount}
            </p>

          </div>

        </div>
      )}

    </aside>
  );
}
