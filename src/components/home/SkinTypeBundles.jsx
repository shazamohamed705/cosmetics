import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import Container from "../ui/Container";
import { useCart } from "../../context/CartContext";
import { useCurrency } from "../../context/CurrencyContext";

/**
 * SkinTypeBundles — horizontal scrollable bundle cards.
 * Each card: large product image on white bg, Sale badge, name (link color),
 * sale price + original struck-through, ADD TO CART button.
 * Props: { bundles: [{ id, name, price, originalPrice, image, handle, badge }] }
 */
function BundleCard({ id, name, price, originalPrice, image, handle, badge = "Sale" }) {
  const { addItem }     = useCart();
  const { formatPrice } = useCurrency();

  function handleAddToCart(e) {
    e.preventDefault();
    addItem({ id, name, price, image, quantity: 1 });
  }

  return (
    <article className="snap-start flex-none w-[160px] xs:w-[180px] sm:w-[210px] md:w-[240px] flex flex-col">
      {/* Image area */}
      <div className="relative bg-white rounded-sm overflow-hidden border border-gray-100">

        <Link to={`/products/${handle}`}>
          <div className="w-full h-52 bg-white flex items-end justify-center pb-2 overflow-hidden">
            <img
              src={image}
              alt={name}
              loading="lazy"
              className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-500"
            />
          </div>
        </Link>
      </div>

      {/* Info */}
      <div className="pt-3 flex flex-col gap-1">
        <Link
          to={`/products/${handle}`}
          className="text-[13px] font-medium text-[#c06060] hover:underline leading-snug line-clamp-2"
        >
          {name}
        </Link>

        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-gray-900 font-bold text-sm">
            Dhs.{price.toFixed(2)}
          </span>
          {originalPrice && originalPrice > price && (
            <span className="text-gray-400 text-xs line-through">
              Dhs.{originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          aria-label={`Add ${name} to cart`}
          className="mt-2 w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-brand text-white text-[11px] font-bold uppercase tracking-widest py-2.5 transition-colors duration-200"
        >
          <ShoppingCart size={13} aria-hidden="true" />
          Add to Cart
        </button>
      </div>
    </article>
  );
}

export default function SkinTypeBundles({ bundles = [] }) {
  return (
    <section className="py-10 md:py-14">
      <Container>
        {/* Header */}
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-normal text-gray-900">
            Skin Type <span className="font-bold">bundles</span>
          </h2>
          <Link
            to="/collections/bundles"
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            View all
          </Link>
        </div>

        {/* Cards row */}
        <div
          className="flex gap-3 sm:gap-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-2"
          style={{ touchAction: "pan-x pan-y" }}
        >
          {bundles.map((bundle) => (
            <BundleCard key={bundle.id} {...bundle} />
          ))}
        </div>
      </Container>
    </section>
  );
}
