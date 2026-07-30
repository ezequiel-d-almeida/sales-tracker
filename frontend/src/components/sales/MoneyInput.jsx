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
            text-sm
            font-semibold
            text-slate-500
            pointer-events-none
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
            h-12
            w-full
            rounded-xl
            border
            border-slate-300
            bg-white
            pl-12
            pr-4
            text-slate-800
            shadow-sm
            outline-none
            transition
            placeholder:text-slate-400
            focus:border-blue-500
            focus:ring-4
            focus:ring-blue-100
          "
        />
      </div>
    </div>
  );
}