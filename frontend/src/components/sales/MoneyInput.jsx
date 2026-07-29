export default function MoneyInput({
  value,
  onChange,
}) {
  return (
    <div className="space-y-2">
      <label
        htmlFor="amount"
        className="block text-sm font-medium text-slate-700"
      >
        Valor da venda
      </label>

      <div className="relative">
        <span
          className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-slate-500
            font-medium
          "
        >
          R$
        </span>

        <input
          id="amount"
          type="number"
          min="0"
          step="0.01"
          placeholder="0,00"
          value={value}
          onChange={onChange}
          className="
            w-full
            rounded-xl
            border
            border-slate-300
            bg-white
            py-3
            pl-12
            pr-4
            text-slate-800
            outline-none
            transition
            focus:border-blue-500
            focus:ring-4
            focus:ring-blue-100
          "
        />
      </div>
    </div>
  );
}