import { useState, useRef } from "react";
import { ShoppingCart, Star, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useCurrency } from "../../context/CurrencyContext";
import { useFlyingCart } from "../../context/FlyingCartContext";

/**
 * ProductCard — matches the screenshot style:
 *  • White bg, subtle border
 *  • Product image (white/light bg) — square
 *  • Brand name (small gray)
 *  • Product name (uppercase, dark, small)
 *  • Star rating row
 *  • Price (brand color) + Original struck-through
 *  • Full-width dark "ADD TO CART" button
 *
 * Props: { id, name, brand, price, originalPrice, image, handle, badge, rating, reviews }
 */
export default function ProductCard({
  id, name, brand, price, originalPrice, image, handle, badge, rating = 0, reviews = 0,
}) {
  const { addItem }     = useCart();
  const { formatPrice } = useCurrency();
  const { flyToCart }   = useFlyingCart();
  const btnRef          = useRef(null);
  const [adding, setAdding] = useState(false);

  function handleAddToCart(e) {
    e.preventDefault();
    if (adding) return;
    addItem({ id, name, price, image, quantity: 1 });
    flyToCart(btnRef.current);
    setAdding(true);
    setTimeout(() => setAdding(false), 700);
  }

  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <article
      className="
        group relative flex flex-col bg-white border border-gray-100
        hover:border-gray-200 hover:shadow-lg
        transition-all duration-300 ease-out
        rounded-sm overflow-hidden
      "
    >
      {/* ── Badge ─────────────────────────────────── */}
      {badge && (
        <span className="absolute top-2 left-2 z-10 bg-brand text-white text-[10px] font-bold px-2 py-0.5 tracking-wide uppercase">
          {badge}
        </span>
      )}
      {discount >= 10 && !badge && (
        <span className="absolute top-2 left-2 z-10 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 tracking-wide">
          -{discount}%
        </span>
      )}

      {/* ── Image ─────────────────────────────────── */}
      <Link
        to={`/products/${handle}`}
        className="block overflow-hidden bg-[#f9f6f3] aspect-square"
        tabIndex={-1}
        aria-hidden="true"
      >
        {image ? (
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="
              w-full h-full object-cover object-center
              group-hover:scale-[1.04]
              transition-transform duration-500 ease-out
            "
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm">
            No image
          </div>
        )}
      </Link>

      {/* ── Info ──────────────────────────────────── */}
      <div className="flex flex-col flex-1 p-3 pt-3 gap-1">

        {/* Brand */}
        {brand && (
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">
            {brand}
          </p>
        )}

        {/* Name */}
        <Link
          to={`/products/${handle}`}
          className="text-[11px] md:text-xs font-semibold text-gray-800 uppercase tracking-wide leading-snug line-clamp-2 hover:text-brand transition-colors"
        >
          {name}
        </Link>

        {/* Stars */}
        <div className="flex items-center gap-1 mt-0.5" aria-label={`Rating: ${rating} out of 5`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={11}
              aria-hidden="true"
              className={
                i < Math.floor(rating)
                  ? "fill-amber-400 text-amber-400"
                  : "fill-gray-200 text-gray-200"
              }
            />
          ))}
          {reviews > 0 && (
            <span className="text-[10px] text-gray-400 ml-0.5">({reviews})</span>
          )}
        </div>

        {/* Price row */}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-brand font-bold text-sm">
            Dhs.{price.toFixed(2)}
          </span>
          {originalPrice && originalPrice > price && (
            <span className="text-gray-400 text-xs line-through">
              Dhs.{originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Add to cart button */}
        <button
          ref={btnRef}
          onClick={handleAddToCart}
          aria-label={`Add ${name} to cart`}
          className={`
            mt-auto w-full flex items-center justify-center gap-2
            bg-gray-900 hover:bg-brand active:bg-brand-dark
            text-white text-[11px] font-bold uppercase tracking-widest
            py-2.5 overflow-hidden relative
            transition-colors duration-200
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand
            ${adding ? "btn-squish-active bg-brand" : ""}
          `}
        >
          <span className={`flex items-center gap-2 transition-opacity duration-150 ${adding ? "opacity-0" : "opacity-100"}`}>
            <ShoppingCart size={13} aria-hidden="true" className={adding ? "icon-fly-active" : ""} />
            Add to Cart
          </span>
          <span
            aria-hidden="true"
            className={`absolute inset-0 flex items-center justify-center gap-1.5 transition-opacity duration-150 ${adding ? "opacity-100" : "opacity-0"}`}
          >
            <Check size={13} className={adding ? "check-flash-active" : ""} />
            Added!
          </span>
        </button>
      </div>
    </article>
  );
}
