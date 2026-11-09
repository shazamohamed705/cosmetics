import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import { useCurrency } from "../../context/CurrencyContext";

/**
 * CurrencyDropdown — shows selected currency with a popover list.
 * Keyboard navigable; Escape closes it.
 */
export default function CurrencyDropdown() {
  const { currency, setCurrency, currencies } = useCurrency();
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handleClick(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Close on Escape
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") setOpen(false);
    },
    []
  );

  return (
    <div ref={containerRef} className="relative" onKeyDown={handleKeyDown}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select currency"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 text-xs font-medium text-gray-700 hover:text-brand transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded px-1 py-0.5"
      >
        {currency}
        <ChevronDown
          size={14}
          aria-hidden="true"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Currency options"
          className="absolute right-0 top-full mt-2 w-44 bg-white border border-gray-100 rounded-md shadow-lg z-50 py-1 text-sm"
        >
          {currencies.map((c) => (
            <li
              key={c.code}
              role="option"
              aria-selected={currency === c.code}
              onClick={() => { setCurrency(c.code); setOpen(false); }}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { setCurrency(c.code); setOpen(false); }}}
              tabIndex={0}
              className={`px-4 py-2 cursor-pointer hover:bg-brand-50 hover:text-brand transition-colors ${
                currency === c.code ? "text-brand font-semibold" : "text-gray-700"
              }`}
            >
              {c.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
