import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Container        from "../ui/Container";
import HoverProductCard from "../ui/HoverProductCard";
import Button           from "../ui/Button";

/* ── Fade-up on scroll ─────────────────────────────────────────────────── */
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
 * CategorySection — one scrollable product row per nav category.
 * Same layout/arrows as BestSellers, cards swap image on hover.
 *
 * Props:
 *   title      string        — e.g. "Skincare"
 *   viewAllTo  string        — e.g. "/collections/skincare"
 *   subtitle   string        — optional tagline
 *   products   Product[]     — same shape as bestSellers
 *   bgColor    string        — optional bg, default transparent
 */
export default function CategorySection({
  title,
  viewAllTo,
  subtitle,
  products = [],
  bgColor = "",
}) {
  const [ref, vis] = useFadeUp();
  const trackRef   = useRef(null);
  const [canLeft,  setCanLeft]  = useState(false);
  const [canRight, setCanRight] = useState(true);

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

  if (!products.length) return null;

  return (
    <section
      className="py-12 md:py-20"
      style={bgColor ? { backgroundColor: bgColor } : undefined}
      ref={ref}
    >
      <Container>
        {/* ── Header ───────────────────────────────── */}
        <div
          className={`flex items-end justify-between mb-8 ${vis ? "animate-fade-up" : "opacity-0"}`}
        >
          <div>
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-gray-900">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-1 text-sm text-gray-400">{subtitle}</p>
            )}
          </div>

          {/* Arrows (desktop) */}
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

        {/* ── Scroll track ─────────────────────────── */}
        <div
          className={`relative ${vis ? "animate-fade-up" : "opacity-0"}`}
          style={{ animationDelay: "80ms" }}
        >
          {/* Left fade edge */}
          <div
            className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 z-10 transition-opacity duration-300"
            style={{
              background: bgColor
                ? `linear-gradient(to right, ${bgColor}, transparent)`
                : "linear-gradient(to right, #ffffff, transparent)",
              opacity: canLeft ? 1 : 0,
            }}
          />
          {/* Right fade edge */}
          <div
            className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 z-10 transition-opacity duration-300"
            style={{
              background: bgColor
                ? `linear-gradient(to left, ${bgColor}, transparent)`
                : "linear-gradient(to left, #ffffff, transparent)",
              opacity: canRight ? 1 : 0,
            }}
          />

          <div
            ref={trackRef}
            className="
              flex gap-5 overflow-x-auto
              scroll-smooth snap-x snap-mandatory pb-4
              [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
            "
          >
            {products.map((p, i) => (
              <div
                key={p.id}
                className="snap-start shrink-0 w-[220px] sm:w-[240px] md:w-[260px]"
                style={
                  vis
                    ? { animation: "card-in 0.4s ease-out both", animationDelay: `${i * 50}ms` }
                    : { opacity: 0 }
                }
              >
                <HoverProductCard {...p} />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile hint */}
        <p className="sm:hidden text-center text-xs text-gray-400 mt-2 select-none">
          ← swipe to browse →
        </p>

        {/* View all CTA */}
        <div
          className={`mt-8 text-center ${vis ? "animate-fade-up" : "opacity-0"}`}
          style={{ animationDelay: "200ms" }}
        >
          <Button as={Link} to={viewAllTo} variant="outline">
            View All {title}
          </Button>
        </div>
      </Container>
    </section>
  );
}
