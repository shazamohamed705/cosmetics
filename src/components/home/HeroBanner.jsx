import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "../ui/Button";

/**
 * HeroBanner — full-width auto-playing image slider.
 *
 * Props:
 *   slides: [{
 *     id, tag, headline, subheadline,
 *     cta: { label, to },
 *     image   ← URL (Unsplash / local / CDN)
 *   }]
 *
 * Features:
 *  • Auto-advance every 5 s (pauses on hover / focus)
 *  • Prev / Next arrow buttons
 *  • Dot indicators
 *  • Fade + slide transition (CSS, no library needed)
 *  • Keyboard accessible (arrow keys, Enter/Space on dots)
 *  • Reduced-motion: disables auto-play & transitions
 */
export default function HeroBanner({ slides }) {
  const [current, setCurrent]   = useState(0);
  const [paused,  setPaused]    = useState(false);
  const [animDir, setAnimDir]   = useState("next"); // "next" | "prev"
  const timerRef                = useRef(null);
  const total                   = slides.length;

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── Navigation helpers ─────────────────────────────── */
  const goTo = useCallback(
    (idx, dir = "next") => {
      setAnimDir(dir);
      setCurrent((idx + total) % total);
    },
    [total]
  );

  const next = useCallback(() => goTo(current + 1, "next"), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1, "prev"), [current, goTo]);

  /* ── Auto-play ──────────────────────────────────────── */
  useEffect(() => {
    if (paused || prefersReduced) return;
    timerRef.current = setInterval(next, 5000);
    return () => clearInterval(timerRef.current);
  }, [next, paused, prefersReduced]);

  /* ── Keyboard: arrow keys on the section ───────────── */
  function handleKeyDown(e) {
    if (e.key === "ArrowLeft")  { prev(); }
    if (e.key === "ArrowRight") { next(); }
  }

  const slide = slides[current];

  return (
    <section
      id="hero"
      aria-label="Hero banner"
      aria-roledescription="carousel"
      className="relative w-full h-[100svh] max-h-[580px] md:h-[620px] md:max-h-none lg:h-[680px] overflow-hidden bg-stone-100 select-none outline-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* ── Slides ─────────────────────────────────────── */}
      {slides.map((s, i) => {
        const isActive = i === current;
        return (
          <div
            key={s.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${i + 1} of ${total}: ${s.headline.replace("\n", " ")}`}
            aria-hidden={!isActive}
            className={`
              absolute inset-0 transition-opacity
              ${prefersReduced ? "" : "duration-700"}
              ${isActive ? "opacity-100 z-10" : "opacity-0 z-0"}
            `}
          >
            {/* Background image */}
            <img
              src={s.image}
              alt=""
              aria-hidden="true"
              loading={i === 0 ? "eager" : "lazy"}
              className="absolute inset-0 w-full h-full object-cover object-center"
            />

            {/* Gradient overlay — left half */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/30 to-transparent" />

            {/* Content */}
            <div className="relative z-10 h-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col justify-center">
              <div
                className={`
                  max-w-lg
                  ${prefersReduced ? "" : "transition-all duration-700 delay-150"}
                  ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
                `}
              >
                {/* Tag */}
                <p className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-white/80 bg-white/15 backdrop-blur-sm px-3 py-1 rounded-full mb-4">
                  {s.tag}
                </p>

                {/* Headline */}
                <h1 className="font-serif text-4xl md:text-5xl lg:text-[3.5rem] font-semibold text-white leading-[1.15]">
                  {s.headline.split("\n").map((line, li) => (
                    <span key={li} className="block">{line}</span>
                  ))}
                </h1>

                {/* Subheadline */}
                <p className="mt-4 text-white/80 text-base md:text-lg leading-relaxed max-w-sm">
                  {s.subheadline}
                </p>

                {/* CTAs */}
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button as={Link} to={s.cta.to} size="lg">
                    {s.cta.label}
                  </Button>
                  <Button
                    as={Link}
                    to="/collections"
                    variant="outline"
                    size="lg"
                    className="!border-white !text-white hover:!bg-white hover:!text-gray-900"
                  >
                    Browse All
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* ── Prev / Next arrows ─────────────────────────── */}
      <button
        type="button"
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20
          w-10 h-10 md:w-12 md:h-12 rounded-full
          bg-white/20 hover:bg-white/40 backdrop-blur-sm
          flex items-center justify-center text-white
          transition-colors duration-200
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <ChevronLeft size={22} aria-hidden="true" />
      </button>

      <button
        type="button"
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20
          w-10 h-10 md:w-12 md:h-12 rounded-full
          bg-white/20 hover:bg-white/40 backdrop-blur-sm
          flex items-center justify-center text-white
          transition-colors duration-200
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <ChevronRight size={22} aria-hidden="true" />
      </button>

      {/* ── Dot indicators ─────────────────────────────── */}
      <div
        role="tablist"
        aria-label="Slide indicators"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2"
      >
        {slides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={i === current}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goTo(i, i > current ? "next" : "prev")}
            className={`
              rounded-full transition-all duration-300
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white
              ${i === current
                ? "w-7 h-2.5 bg-white"
                : "w-2.5 h-2.5 bg-white/45 hover:bg-white/70"}
            `}
          />
        ))}
      </div>

      {/* ── Progress bar ───────────────────────────────── */}
      {!prefersReduced && (
        <div className="absolute bottom-0 left-0 z-20 h-[3px] w-full bg-white/20">
          <div
            key={current}
            className="h-full bg-brand origin-left"
            style={{ animation: paused ? "none" : "hero-progress 5s linear forwards" }}
          />
        </div>
      )}
    </section>
  );
}
