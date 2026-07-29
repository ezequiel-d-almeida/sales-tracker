import {
  LayoutDashboard,
  ShoppingCart,
} from "lucide-react";

import {
  NavLink,
} from "react-router-dom";


const menuItems = [
  {
    label: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Vendas",
    path: "/vendas",
    icon: ShoppingCart,
  },
];


export default function Sidebar() {

  return (
    <aside className="
      w-64
      bg-white
      border-r
      border-slate-200
      p-5
    ">

      <h1 className="
        text-xl
        font-bold
        text-slate-800
        mb-8
      ">
        Central AutoPeças
      </h1>


      <nav className="space-y-2">

        {menuItems.map((item)=>{

          const Icon = item.icon;

          return (

            <NavLink
              key={item.path}
              to={item.path}
              className={({isActive}) =>
                `
                flex
                items-center
                gap-3
                px-4
                py-3
                rounded-lg
                transition

                ${
                  isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-600 hover:bg-slate-100"
                }
                `
              }
            >

              <Icon size={20}/>

              {item.label}

            </NavLink>

          )

        })}

      </nav>

    </aside>
  );
}