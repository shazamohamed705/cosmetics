import { Link } from "react-router-dom";

/* Scrolling ticker keywords */
const TICKER_WORDS = [
  "KERATIN POWER", "ARGAN NOURISHMENT", "DAMAGE REPAIR",
  "SILKY FINISH", "PROFESSIONAL CARE", "DAILY PROTECTION",
  "SALON RESULTS", "DEEP CONDITIONING", "FRIZZ CONTROL",
];

export default function PromoBanner({ headline, subheadline, cta, bgColor, productImage }) {
  const tickers = [...TICKER_WORDS, ...TICKER_WORDS];

  return (
    <section id="promo-banner" aria-label="Promotional banner">
      {/* ── Split Banner ── */}
      <div className="flex flex-col md:flex-row">
        {/* Left — product image */}
        <div
          className="flex-1 flex items-end justify-center overflow-hidden min-h-[220px] md:min-h-[340px]"
          style={{ backgroundColor: "#e8d9c4" }}
        >
          <img
            src={
              productImage ||
              "https://images.unsplash.com/photo-1526758097130-bab247274f58?w=700&q=85&auto=format&fit=crop"
            }
            alt={headline || "Promotional product"}
            className="h-[220px] md:h-[340px] w-auto object-contain object-bottom"
            loading="lazy"
          />
        </div>

        {/* Right — dark copy panel */}
        <div
          className="flex-1 flex flex-col items-start justify-center px-6 sm:px-10 py-8 md:py-12 gap-4"
          style={{ backgroundColor: "#1a1a1a" }}
        >
          <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-semibold text-white leading-snug max-w-xs">
            {headline || "Restore Your Hair's Natural Luxury"}
          </h2>
          <p className="text-sm text-gray-300 leading-relaxed max-w-sm">
            {subheadline ||
              "Transform dry, damaged hair into silky perfection with the power of Keratin & Argan Oil. Deep nourishment, intense shine, and visible repair from the very first use."}
          </p>
          {cta && (
            <Link
              to={cta.to}
              className="mt-1 inline-block border border-white text-white text-sm font-medium px-6 sm:px-7 py-2.5 rounded-full hover:bg-white hover:text-gray-900 transition-colors duration-200"
            >
              {cta.label}
            </Link>
          )}
        </div>
      </div>

      {/* ── Scrolling Ticker ── */}
      <div className="bg-gray-900 py-2.5 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap">
          {tickers.map((word, i) => (
            <span key={i} className="inline-flex items-center gap-3 text-white text-[11px] font-semibold tracking-[0.15em] uppercase mx-6">
              <span className="text-brand text-base leading-none">✦</span>
              {word}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
