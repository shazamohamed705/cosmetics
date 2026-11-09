import { useEffect } from "react";
import { X, Trash2, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useCurrency } from "../../context/CurrencyContext";

/**
 * CartDrawer — slide-in panel from the right showing cart items.
 * Opens when the user clicks the ShoppingBag icon in the Navbar.
 */
export default function CartDrawer({ open, onClose }) {
  const { items, subtotal, removeItem, updateQty, clearCart } = useCart();
  const { formatPrice } = useCurrency();

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handle = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, [open, onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300
          ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* Drawer — slides from right */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`fixed top-0 right-0 z-50 h-full w-80 sm:w-96 bg-white shadow-xl flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} className="text-brand-dark" aria-hidden="true" />
            <span className="font-serif text-lg font-semibold text-brand-dark">Your Cart</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close cart"
            className="p-1 rounded hover:bg-gray-100 transition-colors text-gray-400"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-16">
              <ShoppingBag size={48} className="text-gray-200" aria-hidden="true" />
              <p className="text-gray-400 text-sm">Your cart is empty.</p>
              <button
                onClick={onClose}
                className="text-sm text-brand font-medium hover:underline"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.id} className="flex gap-3">
                  {/* Image */}
                  <div className="w-16 h-16 rounded-lg bg-gray-50 shrink-0 overflow-hidden border border-gray-100">
                    {item.image && (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate leading-snug">{item.name}</p>
                    <p className="text-sm text-brand mt-0.5">{formatPrice(item.price)}</p>

                    <div className="flex items-center gap-2 mt-2">
                      {/* Qty controls */}
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => item.quantity > 1 ? updateQty(item.id, item.quantity - 1) : removeItem(item.id)}
                          aria-label="Decrease quantity"
                          className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors text-base"
                        >
                          −
                        </button>
                        <span className="w-7 text-center text-sm font-medium text-gray-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQty(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                          className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors text-base"
                        >
                          +
                        </button>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeItem(item.id)}
                        aria-label={`Remove ${item.name}`}
                        className="ml-auto text-gray-300 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={15} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer — only shown when cart has items */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 px-5 py-4 space-y-3">
            {/* Subtotal */}
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-semibold text-gray-900">{formatPrice(subtotal)}</span>
            </div>
            <p className="text-xs text-green-600 font-medium">FREE shipping on this order 🎉</p>

            {/* Checkout */}
            <Link
              to="/cart"
              onClick={onClose}
              className="block w-full bg-brand-dark text-white text-center py-3 rounded-xl text-sm font-semibold uppercase tracking-wide hover:bg-brand transition-colors"
            >
              View Cart &amp; Checkout
            </Link>

            {/* Clear */}
            <button
              onClick={() => { clearCart(); onClose(); }}
              className="block w-full text-xs text-gray-300 hover:text-red-400 transition-colors text-center"
            >
              Clear cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}
