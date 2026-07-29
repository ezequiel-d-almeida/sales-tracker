import { createBrowserRouter } from "react-router-dom";

import AppLayout from "../layouts/AppLayout";

import RegisterSale from "../pages/RegisterSale";
import History from "../pages/History";
import Reports from "../pages/Reports";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <RegisterSale />,
      },
      {
        path: "history",
        element: <History />,
      },
      {
        path: "reports",
        element: <Reports />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;