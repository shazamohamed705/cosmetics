import { createBrowserRouter } from "react-router-dom";
import MainLayout      from "../layouts/MainLayout";
import Home            from "../pages/Home";
import Collection      from "../pages/Collection";
import ProductDetails  from "../pages/ProductDetails";
import Cart            from "../pages/Cart";
import Account         from "../pages/Account";
import NotFound        from "../pages/NotFound";

/**
 * router.jsx — Single source of truth for all app routes.
 *
 * To add a new page:
 *   1. Create the component in src/pages/
 *   2. Add a new { path, element } entry inside the MainLayout children array.
 */
const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { index: true,                           element: <Home /> },
      { path: "collections/:slug",             element: <Collection /> },
      { path: "collections/:slug/:sub",        element: <Collection /> },
      { path: "collections",                   element: <Collection /> },
      { path: "products/:handle",              element: <ProductDetails /> },
      { path: "cart",                          element: <Cart /> },
      { path: "account",                       element: <Account /> },
      { path: "*",                             element: <NotFound /> },
    ],
  },
]);

export default router;
