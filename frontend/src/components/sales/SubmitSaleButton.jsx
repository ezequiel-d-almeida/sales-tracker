export default function SubmitSaleButton({
  isLoading = false,
  disabled = false,
}) {
  return (
    <button
      type="submit"
      disabled={disabled || isLoading}
      className="
        h-12
        w-full
        rounded-xl
        bg-blue-600
        text-sm
        font-semibold
        text-white
        shadow-sm
        transition-all
        duration-200
        hover:bg-blue-700
        hover:shadow-md
        disabled:cursor-not-allowed
        disabled:bg-slate-400
        disabled:shadow-none
      "
    >
      {isLoading
        ? "Registrando venda..."
        : "Registrar Venda"}
    </button>
  );
}