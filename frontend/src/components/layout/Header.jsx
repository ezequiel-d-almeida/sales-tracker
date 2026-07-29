export default function Header(){

  return(
    <header className="
      h-16
      bg-white
      border-b
      border-slate-200
      flex
      items-center
      justify-between
      px-6
    ">

      <h2 className="
        text-lg
        font-semibold
        text-slate-700
      ">
        Sistema de Controle de Vendas
      </h2>


      <span className="
        text-sm
        text-slate-500
      ">
        Operador
      </span>

    </header>
  );

}