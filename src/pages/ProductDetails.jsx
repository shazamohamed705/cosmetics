import { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ShoppingBag, Heart, Share2, Star, StarHalf,
  ChevronRight, Minus, Plus, Check, Truck,
  RotateCcw, ShieldCheck, ChevronLeft,
} from "lucide-react";

import Container from "../components/ui/Container";
import TrustBar from "../components/home/TrustBar";
import Newsletter from "../components/home/Newsletter";
import { allProducts, getProductsBySlug } from "../data/products";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";

/* ─── Mock extra product data ────────────────────────────────────────────── */
const EXTRA = {
  description:
    "A lightweight, fast-absorbing formula clinically proven to deliver deep hydration and visible glow in just 7 days. Suitable for all skin types, fragrance-free, and dermatologist-tested.",
  ingredients:
    "Aqua, Niacinamide, Glycerin, Panthenol, Sodium Hyaluronate, Allantoin, Citric Acid, Sodium Citrate, Phenoxyethanol, Ethylhexylglycerin.",
  howToUse:
    "Apply 2–3 drops to clean, dry skin every morning and evening. Follow with moisturiser. For best results, use consistently for 4+ weeks.",
  volume: ["30ML", "50ML", "100ML"],
  shades: null,
};

/* ─── Star renderer ─────────────────────────────────────────────────────── */
function Stars({ rating }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: full }).map((_, i) => (
        <Star key={`f${i}`} size={13} className="fill-amber-400 text-amber-400" />
      ))}
      {half && <StarHalf size={13} className="fill-amber-400 text-amber-400" />}
      {Array.from({ length: empty }).map((_, i) => (
        <Star key={`e${i}`} size={13} className="text-gray-200" />
      ))}
    </span>
  );
}

/* ─── Thumbnail ─────────────────────────────────────────────────────────── */
function Thumb({ src, alt, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-200 flex-shrink-0
        ${active ? "border-brand shadow-md scale-105" : "border-transparent hover:border-brand-200"}`}
    >
      <img src={src} alt={alt} className="w-full h-full object-cover" loading="lazy" />
    </button>
  );
}

/* ─── Animated section wrapper ─────────────────────────────────────────── */
function FadeIn({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.55s ease-out ${delay}ms, transform 0.55s ease-out ${delay}ms`,
      }}
      className={className}
    >
      {children}
    </div>
  );
}

/* ─── Related product card ─────────────────────────────────────────────── */
function RelatedCard({ product }) {
  const { formatPrice } = useCurrency();
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd(e) {
    e.preventDefault();
    addItem({ id: product.id, name: product.name, price: product.price, image: product.image, quantity: 1 });
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  }

  return (
    <Link
      to={`/products/${product.handle}`}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative aspect-square overflow-hidden bg-brand-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {product.badge && (
          <span className="absolute top-2 left-2 bg-brand text-white text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full">
            {product.badge}
          </span>
        )}
        <button
          onClick={handleAdd}
          className={`absolute bottom-2 right-2 p-2 rounded-full shadow transition-all duration-200
            ${added ? "bg-green-500" : "bg-white hover:bg-brand hover:text-white"}`}
          aria-label="Add to cart"
        >
          {added ? <Check size={13} className="text-white" /> : <ShoppingBag size={13} />}
        </button>
      </div>
      <div className="p-3 flex flex-col gap-1">
        <p className="text-[10px] text-brand-dark font-semibold uppercase tracking-wider">{product.brand}</p>
        <p className="text-sm font-medium text-gray-800 line-clamp-2 leading-snug">{product.name}</p>
        <div className="flex items-center gap-1 mt-0.5">
          <Stars rating={product.rating} />
          <span className="text-[10px] text-gray-400">({product.reviews})</span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm font-bold text-brand-dark">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Main Page
   ═══════════════════════════════════════════════════════════════════════════ */
export default function ProductDetails() {
  const { handle } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { formatPrice } = useCurrency();

  /* ── Find product ─────────────────────────────────────────────────────── */
  const product = allProducts.find((p) => p.handle === handle);

  /* ── Local state ──────────────────────────────────────────────────────── */
  const [activeImg, setActiveImg] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVolume, setSelectedVolume] = useState(EXTRA.volume?.[0] ?? null);
  const [wishlist, setWishlist] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeTab, setActiveTab] = useState("description");

  /* ── Mock gallery: repeat the same image 3×, swapping tones for demo ─── */
  const gallery = product
    ? [product.image, product.image, product.image]
    : [];

  /* ── Related: same category, exclude self ─────────────────────────────── */
  const related = product
    ? getProductsBySlug(product.category)
        .filter((p) => p.id !== product.id)
        .slice(0, 4)
    : [];

  /* ── Add to cart ──────────────────────────────────────────────────────── */
  function handleAddToCart() {
    if (!product) return;
    addItem({ id: product.id, name: product.name, price: product.price, image: product.image, quantity });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  }

  /* ── Not found ────────────────────────────────────────────────────────── */
  if (!product) {
    return (
      <main id="main-content" tabIndex={-1}>
        <section className="py-24 text-center">
          <Container>
            <p className="font-serif text-3xl text-gray-300 mb-4">Product not found</p>
            <button
              onClick={() => navigate(-1)}
              className="text-sm text-brand hover:underline"
            >
              ← Go back
            </button>
          </Container>
        </section>
      </main>
    );
  }

  /* ── Safe derived values (only reached when product exists) ───────────── */
  const categoryLabel = (product.category ?? "").replace(/-/g, " ");

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const TABS = [
    { id: "description", label: "Description" },
    { id: "ingredients", label: "Ingredients" },
    { id: "howToUse",    label: "How To Use"  },
  ];

  const TAB_CONTENT = {
    description: EXTRA.description,
    ingredients:  EXTRA.ingredients,
    howToUse:     EXTRA.howToUse,
  };

  return (
    <main id="main-content" tabIndex={-1} className="bg-white">

      {/* ── Breadcrumb ─────────────────────────────────────────────────── */}
      <div className="border-b border-gray-100">
        <Container>
          <nav aria-label="Breadcrumb" className="flex items-center gap-1 py-3 text-xs text-gray-400">
            <Link to="/" className="hover:text-brand transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link to={`/collections/${product.category}`} className="hover:text-brand transition-colors capitalize">
              {categoryLabel}
            </Link>
            <ChevronRight size={12} />
            <span className="text-gray-700 font-medium line-clamp-1 max-w-[200px]">{product.name}</span>
          </nav>
        </Container>
      </div>

      {/* ── Main Section ───────────────────────────────────────────────── */}
      <section className="py-10 md:py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">

            {/* ── Left — Image Gallery ─────────────────────────────────── */}
            <FadeIn className="flex gap-4">
              {/* Thumbnails */}
              <div className="hidden sm:flex flex-col gap-3 pt-1">
                {gallery.map((src, i) => (
                  <Thumb
                    key={i}
                    src={src}
                    alt={`${product.name} view ${i + 1}`}
                    active={activeImg === i}
                    onClick={() => setActiveImg(i)}
                  />
                ))}
              </div>

              {/* Main image */}
              <div className="flex-1 relative rounded-3xl overflow-hidden bg-brand-50 aspect-square">
                <img
                  key={activeImg}
                  src={gallery[activeImg]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  style={{ animation: "pdp-img-in 0.35s ease-out both" }}
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.badge && (
                    <span className="bg-brand text-white text-[11px] font-bold uppercase tracking-wide px-3 py-1 rounded-full shadow">
                      {product.badge}
                    </span>
                  )}
                  {discount && (
                    <span className="bg-red-500 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow">
                      -{discount}%
                    </span>
                  )}
                </div>

                {/* Wishlist */}
                <button
                  onClick={() => setWishlist((v) => !v)}
                  aria-label="Add to wishlist"
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm shadow flex items-center justify-center hover:bg-white transition-all"
                >
                  <Heart
                    size={16}
                    className={wishlist ? "fill-red-500 text-red-500" : "text-gray-400"}
                    style={{ transition: "all 0.25s" }}
                  />
                </button>

                {/* Nav arrows (mobile) */}
                <button
                  onClick={() => setActiveImg((v) => (v - 1 + gallery.length) % gallery.length)}
                  className="sm:hidden absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 shadow flex items-center justify-center"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => setActiveImg((v) => (v + 1) % gallery.length)}
                  className="sm:hidden absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 shadow flex items-center justify-center"
                  aria-label="Next image"
                >
                  <ChevronRight size={16} />
                </button>

                {/* Dots (mobile) */}
                <div className="sm:hidden absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {gallery.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`w-1.5 h-1.5 rounded-full transition-all ${activeImg === i ? "bg-brand w-4" : "bg-gray-300"}`}
                      aria-label={`View ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* ── Right — Product Info ─────────────────────────────────── */}
            <FadeIn delay={100} className="flex flex-col gap-5">

              {/* Brand + Share */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-brand uppercase tracking-widest">{product.brand}</span>
                <button
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-400"
                  aria-label="Share product"
                >
                  <Share2 size={15} />
                </button>
              </div>

              {/* Name */}
              <h1 className="font-serif text-2xl md:text-3xl font-semibold text-gray-900 leading-snug">
                {product.name}
              </h1>

              {/* Rating row */}
              <div className="flex items-center gap-3">
                <Stars rating={product.rating} />
                <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
                <span className="text-sm text-gray-400">({product.reviews} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-brand-dark">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                    <span className="text-sm font-semibold text-red-500">Save {discount}%</span>
                  </>
                )}
              </div>

              <div className="h-px bg-gray-100" />

              {/* Volume selector */}
              {EXTRA.volume && (
                <div className="flex flex-col gap-2">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Size — <span className="text-brand-dark">{selectedVolume}</span>
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {EXTRA.volume.map((v) => (
                      <button
                        key={v}
                        onClick={() => setSelectedVolume(v)}
                        className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-200 ${
                          selectedVolume === v
                            ? "border-brand bg-brand text-white shadow-sm"
                            : "border-gray-300 bg-gray-50 text-gray-700 hover:border-brand hover:bg-brand-50"
                        }`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity + Add to Cart */}
              <div className="flex items-center gap-3">
                {/* Qty stepper */}
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-11 flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-600"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-10 text-center text-sm font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-10 h-11 flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-600"
                    aria-label="Increase quantity"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 h-11 rounded-xl font-semibold text-sm uppercase tracking-wide flex items-center justify-center gap-2 transition-all duration-300 shadow-sm
                    ${addedToCart
                      ? "bg-green-500 text-white scale-[0.98]"
                      : "bg-brand-dark text-white hover:bg-brand active:scale-[0.97]"
                    }`}
                >
                  {addedToCart ? (
                    <>
                      <Check size={16} />
                      Added!
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={16} />
                      Add to Cart
                    </>
                  )}
                </button>

                {/* Wishlist */}
                <button
                  onClick={() => setWishlist((v) => !v)}
                  className={`w-11 h-11 rounded-xl border flex items-center justify-center transition-all duration-200 ${
                    wishlist
                      ? "border-red-300 bg-red-50 text-red-500"
                      : "border-gray-200 text-gray-400 hover:border-red-200 hover:text-red-400"
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart size={16} className={wishlist ? "fill-red-500" : ""} />
                </button>
              </div>

              {/* Delivery perks */}
              <div className="grid grid-cols-3 gap-3 mt-1">
                {[
                  { icon: Truck,       label: "Free Delivery", sub: "Orders over $50" },
                  { icon: RotateCcw,   label: "Easy Returns",  sub: "30-day policy"   },
                  { icon: ShieldCheck, label: "Authentic",     sub: "100% genuine"    },
                ].map(({ icon: Icon, label, sub }) => (
                  <div key={label} className="flex flex-col items-center gap-1 p-3 rounded-xl bg-brand-50 text-center">
                    <Icon size={18} className="text-brand" />
                    <p className="text-[11px] font-semibold text-gray-700">{label}</p>
                    <p className="text-[10px] text-gray-400">{sub}</p>
                  </div>
                ))}
              </div>

            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ── Tabs Section ───────────────────────────────────────────────────── */}
      <section className="pb-16">
        <Container>
          <FadeIn>
            {/* Tab nav */}
            <div className="flex border-b border-gray-200 gap-1">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`px-5 py-3 text-sm font-semibold transition-all duration-200 border-b-2 -mb-px
                    ${activeTab === t.id
                      ? "border-brand text-brand"
                      : "border-transparent text-gray-400 hover:text-gray-700"
                    }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div
              key={activeTab}
              className="pt-6 max-w-2xl"
              style={{ animation: "pdp-tab-in 0.3s ease-out both" }}
            >
              <p className="text-sm text-gray-600 leading-relaxed">{TAB_CONTENT[activeTab]}</p>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ── Related Products ────────────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="pb-20 bg-brand-50">
          <Container>
            <FadeIn className="py-12">
              <div className="flex items-end justify-between mb-8">
                <div>
                  <p className="text-xs font-bold text-brand uppercase tracking-widest mb-1">More to love</p>
                  <h2 className="font-serif text-2xl font-semibold text-gray-900">Related Products</h2>
                </div>
                <Link
                  to={`/collections/${product.category}`}
                  className="text-sm text-brand-dark hover:text-brand font-semibold flex items-center gap-1 transition-colors"
                >
                  View All <ChevronRight size={14} />
                </Link>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {related.map((p, i) => (
                  <FadeIn key={p.id} delay={i * 60}>
                    <RelatedCard product={p} />
                  </FadeIn>
                ))}
              </div>
            </FadeIn>
          </Container>
        </section>
      )}

      <TrustBar />
      <Newsletter />

    </main>
  );
}
