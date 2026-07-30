export default function SubmitSaleButton({
  isLoading = false,
  disabled = false,
}) {
  return (
    <button
      type="submit"
      disabled={disabled || isLoading}
      className="
        w-full
        rounded-xl
        bg-blue-600
        px-6
        py-4
        text-base
        font-semibold
        text-white
        transition
        hover:bg-blue-700
        disabled:cursor-not-allowed
        disabled:bg-slate-400
      "
    >
      {isLoading
        ? "Registrando venda..."
        : "Registrar Venda"}
    </button>
  );
}