import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* ── Skin concern data ───────────────────────────────────────────────────── */
const CONCERNS = [
  {
    id: 1,
    label: "Anti-Aging & Wrinkles",
    to: "/collections/anti-aging",
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&q=80&auto=format&fit=crop",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-5 h-5" aria-hidden="true">
        <path d="M12 3C7 3 3 7 3 12s4 9 9 9 9-4 9-9-4-9-9-9z"/>
        <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/>
      </svg>
    ),
  },
  {
    id: 2,
    label: "Dull Skin & Uneven Tone",
    to: "/collections/brightening",
    image: "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?w=600&q=80&auto=format&fit=crop",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-5 h-5" aria-hidden="true">
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
        <circle cx="12" cy="12" r="4"/>
      </svg>
    ),
  },
  {
    id: 3,
    label: "Redness & Irritation",
    to: "/collections/soothing",
    image: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=600&q=80&auto=format&fit=crop",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-5 h-5" aria-hidden="true">
        <path d="M12 22C6.5 22 2 17.5 2 12S6.5 2 12 2s10 4.5 10 10-4.5 10-10 10z"/>
        <path d="M8 12s.5-3 4-3 4 3 4 3"/>
        <path d="M9 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM15 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    id: 4,
    label: "Excess Oil & Shine",
    to: "/collections/oil-control",
    image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=600&q=80&auto=format&fit=crop",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-5 h-5" aria-hidden="true">
        <path d="M12 2C8 6 5 9.5 5 13a7 7 0 0 0 14 0c0-3.5-3-7-7-11z"/>
        <path d="M9 16a3 3 0 0 0 6 0"/>
      </svg>
    ),
  },
  {
    id: 5,
    label: "Sun Damage",
    to: "/collections/sun-care",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80&auto=format&fit=crop",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-5 h-5" aria-hidden="true">
        <circle cx="12" cy="12" r="4"/>
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
      </svg>
    ),
  },
  {
    id: 6,
    label: "Acne & Breakouts",
    to: "/collections/acne",
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=600&q=80&auto=format&fit=crop",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-5 h-5" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <path d="M8 15s1.5 2 4 2 4-2 4-2"/>
        <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="2" strokeLinecap="round"/>
        <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 7,
    label: "Dark Circles",
    to: "/collections/eye-care",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80&auto=format&fit=crop",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-5 h-5" aria-hidden="true">
        <path d="M1 12S5 5 12 5s11 7 11 7-4 7-11 7S1 12 1 12z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
  },
  {
    id: 8,
    label: "Dryness & Flaking",
    to: "/collections/hydration",
    image: "https://images.unsplash.com/photo-1576426863848-c21f53c60b19?w=600&q=80&auto=format&fit=crop",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-5 h-5" aria-hidden="true">
        <path d="M12 2C8 7 5 10.5 5 14a7 7 0 0 0 14 0c0-3.5-3-7-7-12z"/>
      </svg>
    ),
  },
];

/* ── Fade-up hook ────────────────────────────────────────────────────────── */
function useFadeUp(threshold = 0.08) {
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

/* ── Dot indicator ───────────────────────────────────────────────────────── */
function Dots({ total, active }) {
  return (
    <div className="flex items-center justify-center gap-1.5 mt-6" role="presentation">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`block rounded-full transition-all duration-300 ${
            i === active
              ? "w-5 h-2 bg-brand"
              : "w-2 h-2 bg-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

export default function ShopByConcern() {
  const [secRef, vis] = useFadeUp();
  const trackRef      = useRef(null);
  const [canLeft,  setCanLeft]  = useState(false);
  const [canRight, setCanRight] = useState(true);
  const [dotIdx,   setDotIdx]   = useState(0);

  /* card width: 220px + 20px gap */
  const CARD_W = 240;

  const updateState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    setDotIdx(Math.round(el.scrollLeft / CARD_W));
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateState();
    el.addEventListener("scroll", updateState, { passive: true });
    window.addEventListener("resize", updateState, { passive: true });
    return () => {
      el.removeEventListener("scroll", updateState);
      window.removeEventListener("resize", updateState);
    };
  }, [updateState]);

  function scroll(dir) {
    trackRef.current?.scrollBy({ left: dir * CARD_W * 2, behavior: "smooth" });
  }

  return (
    <section
      id="shop-by-concern"
      ref={secRef}
      className="py-14 md:py-20"
      style={{ backgroundColor: "#FAF6F2" }}
    >
      {/* ── Headline ─────────────────────────────────────── */}
      <div
        className={`text-center px-4 mb-10 ${vis ? "animate-fade-up" : "opacity-0"}`}
      >
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 leading-tight">
          Target your concern.<br className="hidden sm:block" />
          <span className="block">Discover your solution.</span>
        </h2>
        <p className="mt-4 text-sm text-gray-500 tracking-wide">
          Achieve healthier-looking skin.&nbsp;✨
        </p>
      </div>

      {/* ── Carousel wrapper ─────────────────────────────── */}
      <div className="relative">
        {/* Left arrow */}
        <button
          onClick={() => scroll(-1)}
          disabled={!canLeft}
          aria-label="Previous concerns"
          className="
            hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20
            w-10 h-10 rounded-full bg-white shadow-md border border-gray-100
            items-center justify-center
            text-gray-600 hover:text-brand hover:border-brand
            disabled:opacity-25 disabled:pointer-events-none
            transition-all duration-200
          "
        >
          <ChevronLeft size={18} aria-hidden="true" />
        </button>

        {/* Right arrow */}
        <button
          onClick={() => scroll(1)}
          disabled={!canRight}
          aria-label="Next concerns"
          className="
            hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20
            w-10 h-10 rounded-full bg-white shadow-md border border-gray-100
            items-center justify-center
            text-gray-600 hover:text-brand hover:border-brand
            disabled:opacity-25 disabled:pointer-events-none
            transition-all duration-200
          "
        >
          <ChevronRight size={18} aria-hidden="true" />
        </button>

        {/* Edge fades */}
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 z-10"
          style={{ background: "linear-gradient(to right, #FAF6F2 40%, transparent)", opacity: canLeft ? 1 : 0, transition: "opacity .3s" }}
        />
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 z-10"
          style={{ background: "linear-gradient(to left, #FAF6F2 40%, transparent)", opacity: canRight ? 1 : 0, transition: "opacity .3s" }}
        />

        {/* Scrollable track — centered with max-width */}
        <div
          ref={trackRef}
          className="
            flex gap-4 overflow-x-auto
            scroll-smooth snap-x snap-mandatory
            pb-2
            [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
            max-w-7xl mx-auto
            px-6 sm:px-10 lg:px-16
          "
        >
          {CONCERNS.map((c, i) => (
            <Link
              key={c.id}
              to={c.to}
              className="
                group snap-start shrink-0 flex flex-col
                w-[188px] sm:w-[210px] md:w-[228px]
                rounded-2xl overflow-hidden
                border border-[#EDE3D8]/70
                hover:border-brand/30 hover:shadow-md
                transition-all duration-300
              "
              style={{
                backgroundColor: "#FAF6F2",
                ...(vis
                  ? { animation: "card-in 0.45s ease-out both", animationDelay: `${i * 60}ms` }
                  : { opacity: 0 }),
              }}
              aria-label={c.label}
            >
              {/* ── Top: image only ── */}
              <div className="w-full aspect-[4/3] overflow-hidden shrink-0">
                <img
                  src={c.image}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>

              {/* ── Bottom: text content ── */}
              <div className="flex flex-col items-center text-center gap-2 px-4 py-4">
                {/* Icon */}
                <div className="
                  w-9 h-9 rounded-full
                  border border-brand-200
                  flex items-center justify-center
                  text-brand
                  group-hover:bg-brand group-hover:text-white group-hover:border-brand
                  transition-all duration-300
                ">
                  {c.icon}
                </div>

                {/* Label */}
                <p className="text-[11px] font-bold text-gray-800 uppercase tracking-wider leading-snug group-hover:text-brand transition-colors duration-300">
                  {c.label}
                </p>

                {/* Shop Now */}
                <span className="text-[11px] text-brand font-semibold flex items-center gap-1 group-hover:gap-2.5 transition-all duration-200">
                  Shop Now
                  <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Dot indicators ───────────────────────────────── */}
      <Dots total={CONCERNS.length} active={dotIdx} />
    </section>
  );
}
