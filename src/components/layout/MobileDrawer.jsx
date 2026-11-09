import { useEffect } from "react";
import { X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { SITE_CONFIG } from "../../config/site";
import CurrencyDropdown from "./CurrencyDropdown";

/**
 * MobileDrawer — slide-in side nav for screens < lg.
 * Closes on Escape or backdrop click.
 */
export default function MobileDrawer({ open, onClose }) {
  // Close on Escape
  useEffect(() => {
    if (!open) return;
    function handleKey(e) { if (e.key === "Escape") onClose(); }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-white shadow-xl flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <span className="font-serif text-xl text-brand-dark font-semibold">Menu</span>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="p-1 rounded hover:bg-gray-100 transition-colors text-gray-500"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {/* Nav links */}
        <nav aria-label="Mobile navigation" className="flex-1 overflow-y-auto px-5 py-6 space-y-1">
          {SITE_CONFIG.navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={onClose}
              className={({ isActive }) =>
                `block py-3 px-3 text-sm font-medium uppercase tracking-wide rounded transition-colors ${
                  isActive
                    ? "text-brand bg-brand-50 border-l-2 border-brand"
                    : "text-gray-700 hover:text-brand hover:bg-brand-50"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Footer: currency selector */}
        <div className="px-5 py-4 border-t border-gray-100">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Currency</p>
          <CurrencyDropdown />
        </div>
      </div>
    </>
  );
}
