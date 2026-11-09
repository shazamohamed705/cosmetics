import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ShoppingCart, Star } from "lucide-react";
import Container from "../ui/Container";
import { useCart } from "../../context/CartContext";

/* ── Fade-up on scroll ───────────────────────────────────────────────────── */
function useFadeUp(threshold = 0.05) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis];
}

/* ── Fake product data per index ──────────────────────────────────────────── */
const NAMES    = ["Advanced Serum Treatment","Daily Moisturiser SPF","Glow Booster Essence","Repair Night Cream","Brightening Eye Cream","Hydrating Toner Mist","Retinol Renewal Drops","Niacinamide Corrector"];
const PRICES   = [89, 120, 75, 145, 95, 55, 165, 45];
const ORIG     = [129,160, 110,190, 130, 80, 210, 65];
const RATINGS  = [4.5,4.8,4.2,4.9,4.4,4.1,4.7,4.3];
const REVIEWS  = [12, 24, 8, 31, 15, 6, 19, 42];

/* images per category — 8 per set, all cosmetics product shots */
const CATEGORY_IMAGES = {
  "Skincare": [
    "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=600&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?w=600&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1631730486784-74757f140b97?w=600&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1601049676869-702ea24cfd58?w=600&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1592136957897-b2b6ca21e10d?w=600&q=85&auto=format&fit=crop",
  ],
  "Makeup": [
    "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1583241800698-e8ab01830a66?w=600&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1605462863863-10d9e47e15ee?w=600&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1526758097130-bab247274f58?w=600&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&q=85&auto=format&fit=crop",
  ],
  "Bath & Body Care": [
    "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=600&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1586495777744-4e6ffeef9306?w=600&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1631730486784-74757f140b97?w=600&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=600&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1592136957897-b2b6ca21e10d?w=600&q=85&auto=format&fit=crop",
  ],
  "default": [
    "https://images.unsplash.com/photo-1541643600914-78b084683702?w=600&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1601049676869-702ea24cfd58?w=600&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=600&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?w=600&q=85&auto=format&fit=crop",
  ],
};

/* ── Product card ────────────────────────────────────────────────────────── */
function ProductCard({ index, categoryName, vis }) {
  const { addItem } = useCart();
  const i        = index % NAMES.length;
  const images   = CATEGORY_IMAGES[categoryName] || CATEGORY_IMAGES["default"];
  const image    = images[i % images.length];
  const name     = NAMES[i];
  const price    = PRICES[i];
  const orig     = ORIG[i];
  const rating   = RATINGS[i];
  const review   = REVIEWS[i];
  const handle   = `${categoryName.toLowerCase().replace(/\s+/g, "-")}-${i + 1}`;
  const discount = Math.round(((orig - price) / orig) * 100);

  function handleAdd(e) {
    e.preventDefault();
    addItem({ id: handle, name, price, image, quantity: 1 });
  }

  return (
    <article
      className="group relative flex flex-col bg-white border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-[border-color,box-shadow] duration-300 overflow-hidden h-full"
    >
      {/* Sale badge */}
      {discount >= 10 && (
        <span className="absolute top-2.5 left-2.5 z-10 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wide">
          Sale
        </span>
      )}

      {/* Image — taller to fill card */}
      <Link
        to={`/products/${handle}`}
        className="block aspect-[3/4] overflow-hidden bg-[#f3ede7]"
        tabIndex={-1}
        aria-hidden="true"
      >
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </Link>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4 gap-1.5">
        <Link
          to={`/products/${handle}`}
          className="text-xs font-semibold text-gray-800 uppercase tracking-wide leading-snug line-clamp-2 hover:text-brand transition-colors"
        >
          {name}
        </Link>

        {/* Stars */}
        <div className="flex items-center gap-0.5" aria-label={`${rating} stars`}>
          {Array.from({ length: 5 }).map((_, si) => (
            <Star
              key={si}
              size={11}
              aria-hidden="true"
              className={si < Math.floor(rating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}
            />
          ))}
          <span className="text-[10px] text-gray-400 ml-0.5">({review})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-0.5">
          <span className="text-brand font-bold text-base">Dhs.{price.toFixed(2)}</span>
          <span className="text-gray-400 text-xs line-through">Dhs.{orig.toFixed(2)}</span>
        </div>

        {/* Add to cart */}
        <button
          onClick={handleAdd}
          aria-label={`Add ${name} to cart`}
          className="mt-auto w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-brand text-white text-[11px] font-bold uppercase tracking-widest py-3 transition-colors duration-200"
        >
          <ShoppingCart size={13} aria-hidden="true" />
          Add to Cart
        </button>
      </div>
    </article>
  );
}

/* ── One category row ────────────────────────────────────────────────────── */
function CategoryRow({ category, animDelay }) {
  const [ref, vis] = useFadeUp();
  const trackRef   = useRef(null);
  const [canLeft,  setCanLeft]  = useState(false);
  const [canRight, setCanRight] = useState(true);

  const CARD_W = 280;

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  function scroll(dir) {
    trackRef.current?.scrollBy({ left: dir * CARD_W * 2, behavior: "smooth" });
  }

  return (
    <div
      ref={ref}
      className={vis ? "animate-fade-up" : "opacity-0"}
      style={{ animationDelay: `${animDelay}ms` }}
    >
      {/* ── Row header ── */}
      <div className="flex items-center justify-between mb-5 mt-2 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h3 className="font-serif text-2xl md:text-3xl font-semibold text-gray-900 tracking-tight">
          {category.name}
        </h3>
        {/* arrow buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => scroll(-1)}
            disabled={!canLeft}
            aria-label="Scroll left"
            className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-brand hover:text-brand disabled:opacity-20 disabled:pointer-events-none transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scroll(1)}
            disabled={!canRight}
            aria-label="Scroll right"
            className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-brand hover:text-brand disabled:opacity-20 disabled:pointer-events-none transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* ── Scrollable track ── */}
      <div className="relative">
        {/* edge fades */}
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 z-10 transition-opacity duration-300"
          style={{ background: "linear-gradient(to right,white,transparent)", opacity: canLeft ? 1 : 0 }}
        />
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 z-10 transition-opacity duration-300"
          style={{ background: "linear-gradient(to left,white,transparent)", opacity: canRight ? 1 : 0 }}
        />

        <div
          ref={trackRef}
          className="
            flex gap-3 sm:gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-1
            [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
            px-4 sm:px-6 lg:px-8
          "
          style={{ touchAction: "pan-x pan-y" }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="snap-start shrink-0 w-[155px] xs:w-[170px] sm:w-[210px] md:w-[240px] lg:w-[260px]"
              style={
                vis
                  ? { animation: `card-in 0.4s ease-out ${i * 55}ms both` }
                  : { visibility: "hidden" }
              }
            >
              <ProductCard
                index={i}
                categoryName={category.name}
                vis={vis}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── View all button — below cards, centered ── */}
      <div className="mt-6 flex justify-center">
        <Link
          to={category.to}
          className="
            inline-flex items-center gap-2
            border border-brand text-brand
            hover:bg-brand hover:text-white
            text-xs font-semibold uppercase tracking-widest
            px-8 py-2.5
            transition-colors duration-200
          "
        >
          View All {category.name}
          <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>
    </div>
  );
}

/* ── Main export ─────────────────────────────────────────────────────────── */
export default function CategoryShelf({ categories }) {
  return (
    <section id="category-shelf" className="py-12 md:py-20 bg-white">
      <div className="space-y-14 md:space-y-20">
        {categories.map((cat, i) => (
          <CategoryRow key={cat.id} category={cat} animDelay={i * 60} />
        ))}
      </div>
    </section>
  );
}
