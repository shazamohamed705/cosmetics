import { Link } from "react-router-dom";
import Container from "../components/ui/Container";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";
import Button from "../components/ui/Button";
import { Trash2 } from "lucide-react";

export default function Cart() {
  const { items, subtotal, removeItem, updateQty, clearCart } = useCart();
  const { formatPrice } = useCurrency();

  if (items.length === 0) {
    return (
      <main id="main-content" tabIndex={-1}>
        <section className="py-20">
          <Container>
            <div className="text-center">
              <h1 className="font-serif text-3xl font-semibold text-gray-900 mb-4">Your Cart</h1>
              <p className="text-gray-500 mb-8">Your cart is empty.</p>
              <Button as={Link} to="/">Continue Shopping</Button>
            </div>
          </Container>
        </section>
      </main>
    );
  }

  return (
    <main id="main-content" tabIndex={-1}>
      <section className="py-12 md:py-20">
        <Container>
          <h1 className="font-serif text-3xl font-semibold text-gray-900 mb-8">Your Cart</h1>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Items */}
            <div className="flex-1 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 bg-white border border-gray-100 rounded-lg p-4">
                  <div className="w-20 h-20 rounded bg-gray-50 shrink-0 overflow-hidden">
                    {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                    <p className="text-sm text-brand mt-1">{formatPrice(item.price)}</p>
                    <div className="flex items-center gap-3 mt-3">
                      <label htmlFor={`qty-${item.id}`} className="sr-only">Quantity</label>
                      <select
                        id={`qty-${item.id}`}
                        value={item.quantity}
                        onChange={(e) => updateQty(item.id, Number(e.target.value))}
                        className="border border-gray-200 rounded px-2 py-1 text-sm"
                      >
                        {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                          <option key={n} value={n}>{n}</option>
                        ))}
                      </select>
                      <button
                        onClick={() => removeItem(item.id)}
                        aria-label={`Remove ${item.name}`}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:w-80 shrink-0">
              <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
                <h2 className="font-semibold text-gray-900 mb-4">Order Summary</h2>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Subtotal</span><span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-4">
                  <span>Shipping</span><span className="text-green-600">FREE</span>
                </div>
                <div className="flex justify-between font-semibold text-gray-900 border-t border-gray-200 pt-4 mb-6">
                  <span>Total</span><span>{formatPrice(subtotal)}</span>
                </div>
                <button
                  type="button"
                  className="w-full py-2.5 px-6 bg-gray-900 hover:bg-gray-800 active:bg-gray-700 text-white text-sm font-medium tracking-wide rounded transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
                >
                  Checkout
                </button>
                <button onClick={clearCart} className="mt-3 w-full text-xs text-gray-400 hover:text-red-500 transition-colors">
                  Clear cart
                </button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
