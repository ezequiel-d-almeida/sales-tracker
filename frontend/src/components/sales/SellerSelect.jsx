export default function SellerSelect({
  value,
  onChange,
  sellers = [],
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
          w-full
          rounded-xl
          border
          border-slate-300
          bg-white
          px-4
          py-3
          text-slate-800
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