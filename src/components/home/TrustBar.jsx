import { useEffect, useRef, useState } from "react";
import Container from "../ui/Container";

/* ── Icons ───────────────────────────────────────────────────────────────── */
function IconAuthentic() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" aria-hidden="true">
      <circle cx="20" cy="16" r="7" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 36c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M16 16l2.5 2.5L24 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function IconDelivery() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" aria-hidden="true">
      <rect x="3" y="13" width="22" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M25 18h6l4 5v4h-10V18z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <circle cx="10" cy="29" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="30" cy="29" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}
function IconSecure() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" aria-hidden="true">
      <path d="M20 4l14 5v10c0 8-6 14-14 17C12 33 6 27 6 19V9l14-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M14 20l4 4 8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function IconLoyalty() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" aria-hidden="true">
      <rect x="5" y="16" width="30" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M5 22h30" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M20 16v-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M14 16c0-3 2-6 6-6s6 3 6 6" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M20 22v8M16 26h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}
function IconSupport() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" aria-hidden="true">
      <path d="M8 22c0-6.627 5.373-12 12-12s12 5.373 12 12v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <rect x="6" y="22" width="5" height="8" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="29" y="22" width="5" height="8" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M34 30c0 3.314-6.268 6-14 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

const TRUST_ITEMS = [
  { id: 1, Icon: IconAuthentic, label: "100% AUTHENTIC",    desc: "Genuine K-Beauty products sourced from Korea" },
  { id: 2, Icon: IconDelivery,  label: "FAST UAE DELIVERY", desc: "Quick & reliable delivery across UAE" },
  { id: 3, Icon: IconSecure,    label: "SECURE PAYMENTS",   desc: "Safe & encrypted checkout" },
  { id: 4, Icon: IconLoyalty,   label: "LOYALTY REWARDS",   desc: "Earn points & enjoy exclusive member benefits" },
  { id: 5, Icon: IconSupport,   label: "DEDICATED SUPPORT", desc: "We're here to help you anytime" },
];

function useFadeUp() {
  const ref = useRef(null);
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

export default function TrustBar() {
  const [ref, vis] = useFadeUp();

  return (
    <section id="trust" ref={ref} className="py-10 bg-white border-y border-gray-100">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
          {TRUST_ITEMS.map((item, i) => (
            <div
              key={item.id}
              className={`flex flex-col items-center text-center gap-3 px-6 py-4 ${vis ? "animate-fade-up" : "opacity-0"}`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="text-gray-700">
                <item.Icon />
              </div>
              <div>
                <p className="text-sm font-bold tracking-[0.12em] text-gray-900 uppercase">{item.label}</p>
                <p className="text-xs text-gray-500 mt-1 leading-snug">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
