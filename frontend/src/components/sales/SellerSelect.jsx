export default function SellerSelect({
  sellers,
  value,
  onChange,
}) {
  return (
    <div className="space-y-2">
      <label
        htmlFor="seller"
        className="block text-sm font-medium text-slate-700"
      >
        Vendedor
      </label>

      <select
        id="seller"
        value={value}
        onChange={onChange}
        className="
          h-12
          w-full
          rounded-xl
          border
          border-slate-300
          bg-white
          px-4
          text-slate-800
          shadow-sm
          outline-none
          transition
          focus:border-blue-500
          focus:ring-4
          focus:ring-blue-100
        "
      >
        <option value="">
          Selecione um vendedor
        </option>

        {sellers.map((seller) => (
          <option
            key={seller.id}
            value={seller.id}
          >
            {seller.name}
          </option>
        ))}
      </select>
    </div>
  );
}