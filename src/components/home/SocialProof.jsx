import { useState, useRef, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star, ChevronLeft, ChevronRight, Play } from "lucide-react";
import Container from "../ui/Container";

/* ══════════════════════════════════════════════════════════════════════════
   PART 1 — Before / After Slider
══════════════════════════════════════════════════════════════════════════ */
const beforeAfterItems = [
  {
    id: 1,
    before: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&q=80&auto=format&fit=crop",
    after:  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80&auto=format&fit=crop",
    rating: 5,
    quote:  "Dark spots visibly reduced in 6 weeks!",
    author: "Aisha, Dubai",
  },
  {
    id: 2,
    before: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=600&q=80&auto=format&fit=crop",
    after:  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80&auto=format&fit=crop",
    rating: 5,
    quote:  "My skin is glowing after just 4 weeks!",
    author: "Sara, Abu Dhabi",
  },
  {
    id: 3,
    before: "https://images.unsplash.com/photo-1629396492817-c32e09476e6a?w=600&q=80&auto=format&fit=crop",
    after:  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80&auto=format&fit=crop",
    rating: 5,
    quote:  "Redness gone in 3 weeks, couldn't believe it!",
    author: "Nour, Sharjah",
  },
];

function BeforeAfterSlider({ before, after }) {
  const [pos, setPos] = useState(50);
  const containerRef  = useRef(null);
  const dragging      = useRef(false);

  function getPercent(clientX) {
    const rect = containerRef.current.getBoundingClientRect();
    return Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
  }

  const onMove = useCallback((clientX) => {
    if (!dragging.current) return;
    setPos(getPercent(clientX));
  }, []);

  useEffect(() => {
    const mm = (e) => onMove(e.clientX);
    const tm = (e) => onMove(e.touches[0].clientX);
    const up  = () => { dragging.current = false; };
    window.addEventListener("mousemove", mm);
    window.addEventListener("mouseup",   up);
    window.addEventListener("touchmove", tm, { passive: false });
    window.addEventListener("touchend",  up);
    return () => {
      window.removeEventListener("mousemove", mm);
      window.removeEventListener("mouseup",   up);
      window.removeEventListener("touchmove", tm);
      window.removeEventListener("touchend",  up);
    };
  }, [onMove]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full select-none overflow-hidden rounded-xl cursor-col-resize"
      onMouseDown={(e) => { dragging.current = true; setPos(getPercent(e.clientX)); }}
      onTouchStart={(e) => { dragging.current = true; setPos(getPercent(e.touches[0].clientX)); }}
    >
      {/* Before */}
      <img src={before} alt="Before" className="absolute inset-0 w-full h-full object-cover" />
      {/* After (clipped) */}
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img src={after} alt="After" className="absolute inset-0 w-full h-full object-cover" style={{ width: `${10000 / pos}%`, maxWidth: "none" }} />
      </div>
      {/* Divider */}
      <div className="absolute top-0 bottom-0 w-[2px] bg-white shadow-md" style={{ left: `${pos}%`, transform: "translateX(-50%)" }}>
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M5 8H11M5 8L3 6M5 8L3 10M11 8L13 6M11 8L13 10" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      {/* Labels */}
      <span className="absolute top-3 left-3 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Before</span>
      <span className="absolute top-3 right-3 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">After</span>
    </div>
  );
}

function CustomerResults() {
  const [active, setActive] = useState(0);
  const item = beforeAfterItems[active];

  return (
    <div className="py-16 md:py-20">
      <Container>
        {/* heading */}
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-brand font-semibold mb-3">Customer Results</p>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-gray-900">Real People. Real Results.</h2>
          <p className="mt-3 text-sm text-gray-500">See how our customers transformed their skin with Mayysa.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-center justify-center">
          {/* slider */}
          <div className="w-full max-w-xs">
            <div className="w-full aspect-[3/4] rounded-xl overflow-hidden shadow-lg">
              <BeforeAfterSlider before={item.before} after={item.after} key={active} />
            </div>
            {/* review below slider */}
            <div className="mt-4 text-center">
              <div className="flex justify-center gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} className={i < item.rating ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"} />
                ))}
              </div>
              <p className="text-sm italic text-gray-700">"{item.quote}"</p>
              <p className="text-xs text-gray-400 mt-1">— {item.author}</p>
            </div>
          </div>

          {/* thumbnail switcher */}
          <div className="flex lg:flex-col gap-3">
            {beforeAfterItems.map((it, i) => (
              <button
                key={it.id}
                onClick={() => setActive(i)}
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${i === active ? "border-brand shadow-md scale-105" : "border-transparent opacity-60 hover:opacity-90"}`}
              >
                <img src={it.after} alt={it.author} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   PART 2 — UGC / Real Moments Grid
══════════════════════════════════════════════════════════════════════════ */
const ugcItems = [
  { id: 1, type: "image", src: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=600&q=80&auto=format&fit=crop",   span: "row-span-2" },
  { id: 2, type: "video", src: "https://images.unsplash.com/photo-1617891008671-9f3b64b9c0fd?w=600&q=80&auto=format&fit=crop",   span: "row-span-2", duration: "0:28" },
  { id: 3, type: "image", src: "https://images.unsplash.com/photo-1583241800698-e8ab01830a66?w=600&q=80&auto=format&fit=crop",   span: "" },
  { id: 4, type: "image", src: "https://images.unsplash.com/photo-1541643600914-78b084683702?w=600&q=80&auto=format&fit=crop",   span: "" },
  { id: 5, type: "image", src: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&q=80&auto=format&fit=crop",   span: "" },
  { id: 6, type: "image", src: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&q=80&auto=format&fit=crop",   span: "" },
];

function RealMoments() {
  return (
    <div className="py-10 md:py-14">
      <Container>
        <div className="text-center mb-8">
          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-gray-900">Real Moments. Real Glow.</h2>
          <p className="mt-2 text-sm text-gray-500">Shared by our amazing community.</p>
        </div>

        {/* Mobile: 2-col grid. Desktop: 2 tall cols + 2x2 squares */}
        <div className="grid grid-cols-2 md:flex md:gap-3 md:h-[360px] gap-2">

          {/* On mobile: all 4 items in 2-col grid. On md+: first 2 as tall cols */}
          <div className="md:flex-none md:w-[28%] md:h-full aspect-[3/4] md:aspect-auto rounded-xl overflow-hidden bg-gray-100 group">
            <img src={ugcItems[0].src} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
          </div>

          <div className="relative md:flex-none md:w-[28%] md:h-full aspect-[3/4] md:aspect-auto rounded-xl overflow-hidden bg-gray-100 group cursor-pointer">
            <img src={ugcItems[1].src} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow-md">
                <Play size={16} className="text-gray-800 fill-gray-800 ml-0.5" />
              </div>
            </div>
            {ugcItems[1].duration && (
              <span className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded">{ugcItems[1].duration}</span>
            )}
          </div>

          {/* On mobile: these 2 items sit in the 2-col grid. On md+: 2x2 in flex-1 */}
          <div className="contents md:flex-1 md:grid md:grid-cols-2 md:grid-rows-2 md:gap-3">
            {[ugcItems[2], ugcItems[3], ugcItems[4], ugcItems[5]].map((item, i) => (
              <div key={i} className="aspect-square md:aspect-auto rounded-xl overflow-hidden bg-gray-100 group">
                <img src={item.src} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              </div>
            ))}
          </div>

        </div>
      </Container>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   PART 3 — Reviews Carousel
══════════════════════════════════════════════════════════════════════════ */
const reviews = [
  { id: 1, name: "Sarah A.",   location: "Dubai, UAE",      rating: 5, text: "Best skincare products I've tried. My skin has never felt this good!" },
  { id: 2, name: "Huda M.",    location: "Abu Dhabi, UAE",  rating: 5, text: "High quality, beautiful packaging and amazing results." },
  { id: 3, name: "Mariam K.",  location: "Sharjah, UAE",    rating: 5, text: "The glow is real! Totally worth every dirham." },
  { id: 4, name: "Laila R.",   location: "Dubai, UAE",      rating: 5, text: "Fast delivery and excellent customer service." },
  { id: 5, name: "Fatima H.",  location: "Ajman, UAE",      rating: 5, text: "I've been using Mayysa for 3 months and my skin is transformed." },
  { id: 6, name: "Nora S.",    location: "Al Ain, UAE",     rating: 5, text: "The serums are incredible. Highly recommend to everyone." },
];

function ReviewsCarousel() {
  const VISIBLE = 4;
  const [start, setStart] = useState(0);
  const trackRef = useRef(null);

  const canPrev = start > 0;
  const canNext = start + VISIBLE < reviews.length;

  return (
    <div className="py-16 md:py-20">
      <Container>
        {/* heading */}
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-brand font-semibold mb-3">What Our Customers Say</p>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-gray-900">
            Rated 4.8/5 by Thousands of Happy Customers
          </h2>
        </div>

        {/* carousel row */}
        <div className="relative flex items-center gap-3">
          {/* Prev */}
          <button
            onClick={() => setStart((s) => Math.max(0, s - 1))}
            disabled={!canPrev}
            aria-label="Previous reviews"
            className="flex-none w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-brand hover:text-brand disabled:opacity-25 disabled:pointer-events-none transition-colors"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Cards — swipeable on mobile */}
          <div className="flex-1 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex gap-3 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-4">
              {reviews.slice(start, start + VISIBLE).map((r) => (
                <article
                  key={r.id}
                  className="snap-start shrink-0 w-[260px] sm:w-[280px] md:w-auto
                    bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100 flex flex-col gap-3"
                >
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={14} className={i < r.rating ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"} />
                    ))}
                  </div>
                  <p className="text-sm italic text-gray-700 flex-1">"{r.text}"</p>
                  <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                    <div className="w-9 h-9 rounded-full bg-brand/20 flex items-center justify-center shrink-0">
                      <span className="text-brand font-bold text-sm">{r.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{r.name}</p>
                      <p className="text-xs text-gray-400">{r.location}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Next */}
          <button
            onClick={() => setStart((s) => Math.min(reviews.length - VISIBLE, s + 1))}
            disabled={!canNext}
            aria-label="Next reviews"
            className="flex-none w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-brand hover:text-brand disabled:opacity-25 disabled:pointer-events-none transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Link
            to="/collections/best-sellers"
            className="inline-block bg-brand text-white font-medium text-sm px-8 py-3.5 rounded hover:bg-gray-900 transition-colors"
          >
            See Why Thousands Trust Mayysa →
          </Link>
        </div>
      </Container>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   MAIN EXPORT — all 3 parts on one shared background
══════════════════════════════════════════════════════════════════════════ */
export default function SocialProof() {
  return (
    <div style={{ backgroundColor: "#F9F5F0" }}>
      <CustomerResults />
      <RealMoments />
      <ReviewsCarousel />
    </div>
  );
}
