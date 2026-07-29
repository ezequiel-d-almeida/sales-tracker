import { Outlet } from "react-router-dom";

import Header from "../components/layout/Header";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="mx-auto max-w-7xl px-8 py-10">
        <Outlet />
      </main>
    </div>
  );
}