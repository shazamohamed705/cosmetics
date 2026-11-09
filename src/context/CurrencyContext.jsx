import { createContext, useContext, useState } from "react";
import { SITE_CONFIG } from "../config/site";

const CurrencyContext = createContext(null);

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState(SITE_CONFIG.defaultCurrency);

  /** Format a numeric price in the selected currency */
  function formatPrice(amount) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
    }).format(amount);
  }

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, currencies: SITE_CONFIG.currencies }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used inside <CurrencyProvider>");
  return ctx;
}
