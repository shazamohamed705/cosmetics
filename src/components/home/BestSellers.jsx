import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Container   from "../ui/Container";
import ProductCard from "../ui/ProductCard";
import Button      from "../ui/Button";

/* ── Fade-up on scroll ───────────────────────────────────────────────────── */
function useFadeUp() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

/**
 * BestSellers — horizontal scroll carousel (no library).
 * • Prev / Next arrow buttons
 * • Smooth scroll via scrollBy
 * • Arrows auto-hide at start / end
 * • Swipeable on touch (native overflow-x scroll)
 * • Dot indicators track visible position
 */
export default function BestSellers({ products }) {
  const [ref, vis]   = useFadeUp();
  const trackRef     = useRef(null);
  const [canLeft,  setCanLeft]  = useState(false);
  const [canRight, setCanRight] = useState(true);

  /* Card width = 240px + 20px gap → scroll one card at a time */
  const CARD_W = 260;

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows, { passive: true });
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows]);

  function scrollBy(dir) {
    trackRef.current?.scrollBy({ left: dir * CARD_W * 2, behavior: "smooth" });
  }

  return (
    <section id="best-sellers-carousel" className="py-12 md:py-20 bg-gray-50" ref={ref}>
      <Container>
        {/* ── Header row ───────────────────────────────── */}
        <div
          className={`flex items-end justify-between mb-8 ${vis ? "animate-fade-up" : "opacity-0"}`}
        >
          <div>
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-gray-900">
              Best Sellers
            </h2>
            <p className="mt-1 text-sm text-gray-400">
              The products our customers can't stop re-ordering.
            </p>
          </div>

          {/* Arrow buttons (desktop) */}
          <div className="hidden sm:flex gap-2 shrink-0">
            <button
              onClick={() => scrollBy(-1)}
              disabled={!canLeft}
              aria-label="Scroll left"
              className="
                w-10 h-10 rounded-full border border-gray-300
                flex items-center justify-center
                text-gray-500 hover:border-brand hover:text-brand
                disabled:opacity-30 disabled:pointer-events-none
                transition-colors duration-200
              "
            >
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            <button
              onClick={() => scrollBy(1)}
              disabled={!canRight}
              aria-label="Scroll right"
              className="
                w-10 h-10 rounded-full border border-gray-300
                flex items-center justify-center
                text-gray-500 hover:border-brand hover:text-brand
                disabled:opacity-30 disabled:pointer-events-none
                transition-colors duration-200
              "
            >
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* ── Scroll track ─────────────────────────────── */}
        <div
          className={`relative ${vis ? "animate-fade-up" : "opacity-0"}`}
          style={{ animationDelay: "80ms" }}
        >
          {/* Left fade edge */}
          <div
            className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 z-10 transition-opacity duration-300"
            style={{
              background: "linear-gradient(to right, #f9fafb, transparent)",
              opacity: canLeft ? 1 : 0,
            }}
          />
          {/* Right fade edge */}
          <div
            className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 z-10 transition-opacity duration-300"
            style={{
              background: "linear-gradient(to left, #f9fafb, transparent)",
              opacity: canRight ? 1 : 0,
            }}
          />

          {/* The scrollable row */}
          <div
            ref={trackRef}
            className="
              flex gap-5 overflow-x-auto
              scroll-smooth snap-x snap-mandatory
              pb-4
              [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
            "
            style={{ touchAction: "pan-x pan-y" }}
          >
            {products.map((p, i) => (
              <div
                key={p.id}
                className="
                  snap-start shrink-0
                  w-[220px] sm:w-[240px] md:w-[260px]
                "
                style={
                  vis
                    ? { animation: `card-in 0.4s ease-out both`, animationDelay: `${i * 50}ms` }
                    : { opacity: 0 }
                }
              >
                <ProductCard {...p} />
              </div>
            ))}
          </div>
        </div>

        {/* ── Mobile swipe hint ────────────────────────── */}
        <p className="sm:hidden text-center text-xs text-gray-400 mt-2 select-none">
          ← swipe to browse →
        </p>

        {/* ── View all CTA ─────────────────────────────── */}
        <div className={`mt-8 text-center ${vis ? "animate-fade-up" : "opacity-0"}`}
          style={{ animationDelay: "200ms" }}>
          <Button as={Link} to="/collections/best-sellers" variant="outline">
            View All Best Sellers
          </Button>
        </div>
      </Container>
    </section>
  );
}
