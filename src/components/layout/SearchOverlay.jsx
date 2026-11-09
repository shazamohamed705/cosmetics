import { useEffect, useRef } from "react";
import { X, Search } from "lucide-react";

/**
 * SearchOverlay — full-screen search modal.
 * Triggered by the search icon in the Navbar.
 */
export default function SearchOverlay({ open, onClose }) {
  const inputRef = useRef(null);

  // Focus input when opened; close on Escape
  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center pt-24 px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Search"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl p-6 relative">
        <button
          onClick={onClose}
          aria-label="Close search"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
        >
          <X size={20} aria-hidden="true" />
        </button>

        <label htmlFor="search-input" className="block text-xs uppercase tracking-wider text-gray-400 mb-3">
          Search products
        </label>
        <div className="flex items-center border-b-2 border-brand pb-2 gap-3">
          <Search size={18} className="text-brand shrink-0" aria-hidden="true" />
          <input
            id="search-input"
            ref={inputRef}
            type="search"
            placeholder="Search for skincare, fragrance…"
            className="flex-1 text-base text-gray-800 placeholder-gray-400 outline-none bg-transparent"
          />
        </div>
        <p className="mt-4 text-xs text-gray-400">Press Esc to close</p>
      </div>
    </div>
  );
}
