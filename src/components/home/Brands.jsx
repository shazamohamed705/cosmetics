import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

/**
 * Brands — "Shop by Brand" infinite horizontal marquee.
 * Logos scroll left automatically; hovering pauses.
 * Uses text-based logo placeholders (swap <BrandLogo> for <img> when real assets exist).
 *
 * Props: { brands: [{ id, name, logo?, to? }] }
 */

/* Styled text logo — bigger, bolder, per-brand personality */
const BRAND_STYLES = {
  default:        "font-sans font-bold tracking-[0.18em] text-gray-700 text-xl uppercase",
  "Cetaphil":     "font-sans font-extrabold tracking-wider text-[#007B5E] text-xl uppercase",
  "The Ordinary": "font-sans font-semibold tracking-[0.25em] text-gray-800 text-lg uppercase",
  "Garnier":      "font-sans font-extrabold text-[#78BE20] text-xl uppercase tracking-wide",
  "L'Oréal":     "font-serif italic font-bold text-gray-900 text-2xl",
  "Neutrogena":   "font-sans font-extrabold text-[#0057A8] text-xl uppercase tracking-tight",
  "Bioderma":     "font-sans font-black text-[#8B1A1A] text-xl uppercase tracking-widest",
  "CeraVe":       "font-sans font-black tracking-tight text-[#003087] text-2xl uppercase",
  "Laneige":      "font-serif font-bold tracking-[0.14em] text-gray-700 text-xl",
  "Medicube":     "font-sans font-extrabold text-gray-900 text-xl uppercase tracking-wide",
  "Purito":       "font-sans font-bold italic text-[#5f7a61] text-xl uppercase",
};

function BrandLogo({ brand }) {
  const cls = BRAND_STYLES[brand.name] || BRAND_STYLES.default;
  const to  = brand.to || `/collections/brands/${brand.name.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <Link
      to={to}
      className="
        group flex items-center justify-center
        min-w-[160px] h-20 px-8
        grayscale opacity-55
        hover:grayscale-0 hover:opacity-100
        transition-all duration-300
      "
      aria-label={`Shop ${brand.name}`}
    >
      {brand.logo ? (
        <img
          src={brand.logo}
          alt={brand.name}
          className="h-12 w-auto object-contain"
          loading="lazy"
        />
      ) : (
        <span className={`${cls} group-hover:text-brand transition-colors duration-300 whitespace-nowrap`}>
          {brand.name}
        </span>
      )}
    </Link>
  );
}

/* Fade-up hook */
function useFadeUp() {
  const ref     = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

export default function Brands({ brands }) {
  const [ref, vis] = useFadeUp();

  return (
    <section id="brands" className="py-12 md:py-16 bg-white border-t border-gray-100" ref={ref}>
      {/* Section heading */}
      <div
        className={`text-center mb-6 ${vis ? "animate-fade-up" : "opacity-0"}`}
        style={{ animationDelay: "0ms" }}
      >
        <h2 className="font-serif text-2xl md:text-3xl font-semibold text-gray-900">
          Shop by Brand
        </h2>
      </div>

      {/* Marquee wrapper — edge fades via CSS mask */}
      <div
        className={`
          relative overflow-hidden
          ${vis ? "animate-fade-up" : "opacity-0"}
        `}
        style={{
          animationDelay: "100ms",
          maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
      >
        <div className="animate-brand-scroll">
          {/* Track A */}
          {brands.map((b) => (
            <BrandLogo key={`a-${b.id}`} brand={b} />
          ))}
          {/* Separator dot */}
          <span className="flex items-center px-4 text-brand-300 text-xl select-none">✦</span>

          {/* Track B — mirror for seamless loop */}
          {brands.map((b) => (
            <BrandLogo key={`b-${b.id}`} brand={b} />
          ))}
          <span className="flex items-center px-4 text-brand-300 text-xl select-none">✦</span>
        </div>
      </div>
    </section>
  );
}
