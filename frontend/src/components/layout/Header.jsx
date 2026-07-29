import { NavLink } from "react-router-dom";

const navigation = [
  {
    label: "Registrar Venda",
    path: "/",
  },
  {
    label: "Histórico",
    path: "/history",
  },
  {
    label: "Relatórios",
    path: "/reports",
  },
];

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-8">
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            Central AutoPeças
          </h1>

          <p className="text-sm text-slate-500">
            Sistema de Controle de Vendas
          </p>
        </div>

        <nav className="flex items-center gap-8">
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive
                    ? "text-blue-600"
                    : "text-slate-600 hover:text-slate-900"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}