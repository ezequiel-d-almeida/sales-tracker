import { createBrowserRouter } from "react-router-dom";

import AppLayout from "../layouts/AppLayout";

import Dashboard from "../pages/Dashboard";
import Sales from "../pages/Sales";
import NotFound from "../pages/NotFound";


const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "vendas",
        element: <Sales />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);


export default router;