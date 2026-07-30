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
    <div className="space-y-2">
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
                h-12
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                text-sm
                font-medium
                shadow-sm
                transition-all
                duration-200

                ${
                  selected
                    ? "border-blue-600 bg-blue-600 text-white shadow-md"
                    : "border-slate-300 bg-white text-slate-700 hover:border-blue-400 hover:bg-blue-50"
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