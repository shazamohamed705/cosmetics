import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./app/router";
import { CartProvider }        from "./context/CartContext";
import { CurrencyProvider }    from "./context/CurrencyContext";
import { FlyingCartProvider }  from "./context/FlyingCartContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Providers wrap the entire router so every page has access */}
    <CurrencyProvider>
      <CartProvider>
        <FlyingCartProvider>
          <RouterProvider router={router} />
        </FlyingCartProvider>
      </CartProvider>
    </CurrencyProvider>
  </StrictMode>
);
