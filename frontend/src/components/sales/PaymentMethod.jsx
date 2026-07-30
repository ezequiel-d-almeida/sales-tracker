import {
  Banknote,
  CreditCard,
  Landmark,
} from "lucide-react";

const paymentMethods = [
  {
    id: "CASH",
    label: "Dinheiro",
    icon: Banknote,
  },
  {
    id: "PIX",
    label: "Pix",
    icon: Landmark,
  },
  {
    id: "DEBIT",
    label: "Débito",
    icon: CreditCard,
  },
  {
    id: "CREDIT",
    label: "Crédito",
    icon: CreditCard,
  },
];

export default function PaymentMethod({
  value,
  onChange,
}) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-slate-700">
        Forma de pagamento
      </label>

      <div className="grid grid-cols-2 gap-3">
        {paymentMethods.map((method) => {
          const Icon = method.icon;

          const selected = value === method.id;

          return (
            <button
              key={method.id}
              type="button"
              onClick={() => onChange(method.id)}
              className={`
                flex
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                px-4
                py-4
                font-medium
                transition-all

                ${
                  selected
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-slate-300 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50"
                }
              `}
            >
              <Icon size={18} />

              {method.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}