import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Container from "../ui/Container";
import ProductCard from "../ui/ProductCard";
import Button from "../ui/Button";

/**
 * ProductTabs — single section with 2 tabs: Best Sellers / New Arrivals.
 * Matches the screenshot: centered tab bar, underline indicator,
 * animated grid swap, "View All" link.
 *
 * Props:
 *   tabs: [{ id, label, viewAllTo, products: ProductCard[] }]
 */
export default function ProductTabs({ tabs }) {
  const [active, setActive]     = useState(0);
  const [animating, setAnimating] = useState(false);
  const prevTab                 = useRef(0);

  function switchTab(idx) {
    if (idx === active || animating) return;
    prevTab.current = active;
    setAnimating(true);
    setTimeout(() => {
      setActive(idx);
      setAnimating(false);
    }, 200); // matches CSS fade-out duration
  }

  const currentTab = tabs[active];

  return (
    <section id="product-tabs" className="py-12 md:py-20 bg-white">
      <Container>

        {/* ── Tab bar ────────────────────────────────────────────────── */}
        <div className="flex items-center justify-center gap-0 mb-10 border-b border-gray-200">
          {tabs.map((tab, i) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active === i}
              onClick={() => switchTab(i)}
              className={`
                relative px-8 py-3 text-sm font-semibold uppercase tracking-[0.12em]
                transition-colors duration-200 outline-none
                focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2
                ${active === i
                  ? "text-gray-900"
                  : "text-gray-400 hover:text-gray-600"}
              `}
            >
              {tab.label}

              {/* Animated underline indicator */}
              <span
                className={`
                  absolute bottom-[-1px] left-0 h-[2px] bg-gray-900
                  transition-all duration-300 ease-out
                  ${active === i ? "w-full" : "w-0"}
                `}
              />
            </button>
          ))}
        </div>

        {/* ── Product grid ───────────────────────────────────────────── */}
        <div
          className={`
            grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5
            transition-opacity duration-200
            ${animating ? "opacity-0 translate-y-1" : "opacity-100 translate-y-0"}
          `}
          style={{ transition: "opacity 0.2s ease, transform 0.2s ease" }}
        >
          {currentTab.products.map((product, i) => (
            <div
              key={product.id}
              className="opacity-0 animate-card-in"
              style={{ animationDelay: `${i * 40}ms`, animationFillMode: "forwards" }}
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>

        {/* ── View all button ─────────────────────────────────────────── */}
        <div className="mt-10 flex justify-center">
          <Button as={Link} to={currentTab.viewAllTo} variant="outline" size="md">
            View All {currentTab.label}
          </Button>
        </div>

      </Container>
    </section>
  );
}
