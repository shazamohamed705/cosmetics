import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Check, ChevronDown, LayoutGrid, LayoutList, PackageOpen, SlidersHorizontal, X } from "lucide-react";
import ProductCard from "../components/ui/ProductCard";
import { getProductsBySlug, getCollectionMeta } from "../data/products";

/* ══════════════════════════════════════════════════════════════════════════
   Helpers
   ══════════════════════════════════════════════════════════════════════════ */

const SORT_OPTIONS = [
  { value: "featured",   label: "Featured" },
  { value: "price-asc",  label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "rating",     label: "Top Rated" },
  { value: "newest",     label: "Newest" },
];

function applySort(arr, sort) {
  const a = [...arr];
  switch (sort) {
    case "price-asc":  return a.sort((x, y) => x.price - y.price);
    case "price-desc": return a.sort((x, y) => y.price - x.price);
    case "rating":     return a.sort((x, y) => y.rating - x.rating);
    case "newest":     return [...a.filter(p => p.badge === "New"), ...a.filter(p => p.badge !== "New")];
    default:           return a;
  }
}

/* ── useOutsideClick ──────────────────────────────────────────────────── */
function useOutsideClick(ref, handler) {
  useEffect(() => {
    function listener(e) {
      if (ref.current && !ref.current.contains(e.target)) handler();
    }
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [ref, handler]);
}

/* ══════════════════════════════════════════════════════════════════════════
   Generic Dropdown wrapper
   ══════════════════════════════════════════════════════════════════════════ */
function FilterDropdown({ label, activeCount = 0, children }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useOutsideClick(ref, () => setOpen(false));

  const hasActive = activeCount > 0;
  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className={`
          inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border rounded-full
          transition-colors duration-150 whitespace-nowrap select-none
          ${hasActive
            ? "bg-gray-900 text-white border-gray-900"
            : "bg-white text-gray-700 border-gray-300 hover:border-gray-500"
          }
        `}
      >
        {label}
        {hasActive && (
          <span className="ml-0.5 bg-white text-gray-900 rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold leading-none">
            {activeCount}
          </span>
        )}
        <ChevronDown size={12} className={`transition-transform duration-150 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="
          absolute left-0 top-full mt-1.5 z-30
          bg-white border border-gray-200 rounded-xl shadow-xl
          min-w-[200px] p-3
        ">
          {children}
        </div>
      )}
    </div>
  );
}

/* ── Checkbox row ─────────────────────────────────────────────────────── */
function CheckRow({ label, checked, onChange, count }) {
  return (
    <label className="flex items-center justify-between gap-3 py-1.5 cursor-pointer group">
      <div className="flex items-center gap-2">
        <span className={`
          w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors
          ${checked ? "bg-gray-900 border-gray-900" : "border-gray-300 group-hover:border-gray-500"}
        `}>
          {checked && <Check size={10} className="text-white" strokeWidth={3} />}
        </span>
        <input type="checkbox" className="sr-only" checked={checked} onChange={onChange} />
        <span className="text-xs text-gray-700">{label}</span>
      </div>
      {count != null && <span className="text-[10px] text-gray-400">{count}</span>}
    </label>
  );
}

/* ── Price range filter ───────────────────────────────────────────────── */
function PriceFilter({ min, max, value, onChange }) {
  const [lo, setLo] = useState(value[0]);
  const [hi, setHi] = useState(value[1]);

  // sync when value prop changes (e.g. reset)
  useEffect(() => { setLo(value[0]); setHi(value[1]); }, [value]);

  function commit(newLo, newHi) {
    setLo(newLo); setHi(newHi);
    onChange([newLo, newHi]);
  }

  return (
    <div className="flex flex-col gap-3 pt-1">
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>Dhs. {lo}</span>
        <span>Dhs. {hi}</span>
      </div>
      {/* Min slider */}
      <input
        type="range" min={min} max={max} step={5} value={lo}
        onChange={e => { const v = Math.min(Number(e.target.value), hi - 5); commit(v, hi); }}
        className="w-full accent-gray-900 h-1 cursor-pointer"
      />
      {/* Max slider */}
      <input
        type="range" min={min} max={max} step={5} value={hi}
        onChange={e => { const v = Math.max(Number(e.target.value), lo + 5); commit(lo, v); }}
        className="w-full accent-gray-900 h-1 cursor-pointer"
      />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   Main Collection page
   ══════════════════════════════════════════════════════════════════════════ */
export default function Collection() {
  const { slug, sub } = useParams();
  // When a sub-category is selected (e.g. /collections/skincare/serums),
  // use the full "slug/sub" key so filters and title reflect the sub-category.
  const effectiveSlug = sub ? `${slug}/${sub}` : slug;
  const meta = useMemo(() => getCollectionMeta(effectiveSlug), [effectiveSlug]);
  const raw  = useMemo(() => getProductsBySlug(effectiveSlug), [effectiveSlug]);

  /* ── derive filter options from the actual product list ─────────────── */
  const brands    = useMemo(() => [...new Set(raw.map(p => p.brand))].sort(), [raw]);
  const priceMin  = useMemo(() => Math.floor(Math.min(...raw.map(p => p.price))), [raw]);
  const priceMax  = useMemo(() => Math.ceil(Math.max(...raw.map(p => p.price))), [raw]);
  const badgeOpts = useMemo(
    () => [...new Set(raw.map(p => p.badge).filter(Boolean))].sort(),
    [raw]
  );

  /* ── filter state ───────────────────────────────────────────────────── */
  const [sort,          setSort]          = useState("featured");
  const [compact,       setCompact]       = useState(false);
  const [sortOpen,      setSortOpen]      = useState(false);
  const sortRef = useRef(null);
  useOutsideClick(sortRef, () => setSortOpen(false));

  // Availability: "all" | "on-sale"
  const [avail,         setAvail]         = useState([]);           // [] means all
  // Price range
  const [priceRange,    setPriceRange]    = useState([priceMin, priceMax]);
  // Brand checkboxes — set of brand strings
  const [brandFilter,   setBrandFilter]   = useState(new Set());
  // Badge filter (More Filters)
  const [badgeFilter,   setBadgeFilter]   = useState(new Set());

  // reset price range when slug changes
  useEffect(() => {
    setPriceRange([priceMin, priceMax]);
    setBrandFilter(new Set());
    setBadgeFilter(new Set());
    setAvail([]);
    setSort("featured");
  }, [effectiveSlug, priceMin, priceMax]);

  /* ── apply all filters + sort ───────────────────────────────────────── */
  const products = useMemo(() => {
    let list = raw;

    // availability
    if (avail.includes("on-sale")) {
      list = list.filter(p => p.originalPrice && p.originalPrice > p.price);
    }
    if (avail.includes("in-stock")) {
      // all demo items are "in stock", so this is a no-op but correct semantically
    }

    // price
    list = list.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // brand
    if (brandFilter.size > 0) {
      list = list.filter(p => brandFilter.has(p.brand));
    }

    // badge
    if (badgeFilter.size > 0) {
      list = list.filter(p => p.badge && badgeFilter.has(p.badge));
    }

    return applySort(list, sort);
  }, [raw, avail, priceRange, brandFilter, badgeFilter, sort]);

  /* ── active filter count per dropdown ──────────────────────────────── */
  const availActive  = avail.length;
  const priceActive  = (priceRange[0] > priceMin || priceRange[1] < priceMax) ? 1 : 0;
  const brandActive  = brandFilter.size;
  const badgeActive  = badgeFilter.size;
  const totalActive  = availActive + priceActive + brandActive + badgeActive;

  /* ── toggle helpers ─────────────────────────────────────────────────── */
  function toggleAvail(val) {
    setAvail(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]);
  }
  function toggleBrand(b) {
    setBrandFilter(prev => {
      const next = new Set(prev);
      next.has(b) ? next.delete(b) : next.add(b);
      return next;
    });
  }
  function toggleBadge(b) {
    setBadgeFilter(prev => {
      const next = new Set(prev);
      next.has(b) ? next.delete(b) : next.add(b);
      return next;
    });
  }
  function clearAll() {
    setAvail([]);
    setPriceRange([priceMin, priceMax]);
    setBrandFilter(new Set());
    setBadgeFilter(new Set());
  }

  /* count per brand in current raw (unfiltered) list */
  const brandCount = useMemo(() => {
    const m = {};
    raw.forEach(p => { m[p.brand] = (m[p.brand] || 0) + 1; });
    return m;
  }, [raw]);

  // Scroll to top on slug/sub change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [effectiveSlug]);

  const currentSortLabel = SORT_OPTIONS.find(o => o.value === sort)?.label ?? "Sort";

  return (
    <main id="main-content" tabIndex={-1}>
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 xl:px-10 pt-8 pb-14">

        {/* ── Page title ──────────────────────────────────────────────── */}
        <div className="mb-6">
          <h1 className="font-serif text-3xl md:text-4xl font-semibold text-gray-900 leading-tight">
            {meta.name}
          </h1>
          {meta.description && (
            <p className="mt-1.5 text-sm text-gray-500">{meta.description}</p>
          )}
        </div>

        {/* ── Toolbar ─────────────────────────────────────────────────── */}
        <div className="flex flex-wrap items-center gap-2 py-3 border-t border-b border-gray-200 mb-6">

          {/* Left: filter dropdowns */}
          <div className="flex items-center gap-2 flex-wrap flex-1">
            <SlidersHorizontal size={15} className="text-gray-500 shrink-0" aria-hidden="true" />

            {/* Availability */}
            <FilterDropdown label="Availability" activeCount={availActive}>
              <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-1">Stock</p>
              <CheckRow
                label="In Stock"
                checked={avail.includes("in-stock")}
                onChange={() => toggleAvail("in-stock")}
              />
              <CheckRow
                label="On Sale"
                checked={avail.includes("on-sale")}
                onChange={() => toggleAvail("on-sale")}
                count={raw.filter(p => p.originalPrice && p.originalPrice > p.price).length}
              />
            </FilterDropdown>

            {/* Price */}
            <FilterDropdown label="Price" activeCount={priceActive}>
              <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-1">Price Range</p>
              <PriceFilter
                min={priceMin}
                max={priceMax}
                value={priceRange}
                onChange={setPriceRange}
              />
              {priceActive > 0 && (
                <button
                  type="button"
                  onClick={() => setPriceRange([priceMin, priceMax])}
                  className="mt-2 text-xs text-brand hover:underline"
                >
                  Reset
                </button>
              )}
            </FilterDropdown>

            {/* Brand */}
            <FilterDropdown label="Brand" activeCount={brandActive}>
              <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-1">Brand</p>
              <div className="max-h-52 overflow-y-auto pr-1 flex flex-col">
                {brands.map(b => (
                  <CheckRow
                    key={b}
                    label={b}
                    checked={brandFilter.has(b)}
                    onChange={() => toggleBrand(b)}
                    count={brandCount[b]}
                  />
                ))}
              </div>
            </FilterDropdown>

            {/* More Filters — badge type */}
            {badgeOpts.length > 0 && (
              <FilterDropdown label="More filters" activeCount={badgeActive}>
                <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-1">Label</p>
                {badgeOpts.map(b => (
                  <CheckRow
                    key={b}
                    label={b}
                    checked={badgeFilter.has(b)}
                    onChange={() => toggleBadge(b)}
                    count={raw.filter(p => p.badge === b).length}
                  />
                ))}
              </FilterDropdown>
            )}

            {/* Clear all */}
            {totalActive > 0 && (
              <button
                type="button"
                onClick={clearAll}
                className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-gray-900 transition-colors ml-1"
              >
                <X size={12} /> Clear all
              </button>
            )}
          </div>

          {/* Right: count + sort + grid toggle */}
          <div className="flex items-center gap-3 shrink-0 ml-auto">
            <span className="hidden sm:block text-xs text-gray-500">
              {products.length} {products.length === 1 ? "item" : "items"}
            </span>

            {/* Sort */}
            <div className="relative" ref={sortRef}>
              <button
                type="button"
                onClick={() => setSortOpen(v => !v)}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-700 hover:text-gray-900 transition-colors"
                aria-expanded={sortOpen}
                aria-haspopup="listbox"
              >
                <span className="hidden sm:inline text-gray-400">Sort:</span> {currentSortLabel}
                <ChevronDown size={12} className={`transition-transform duration-150 ${sortOpen ? "rotate-180" : ""}`} />
              </button>
              {sortOpen && (
                <ul
                  role="listbox"
                  className="absolute right-0 top-full mt-1 z-30 bg-white border border-gray-200 shadow-xl rounded-xl min-w-[190px] py-1 text-xs"
                >
                  {SORT_OPTIONS.map(opt => (
                    <li
                      key={opt.value}
                      role="option"
                      aria-selected={sort === opt.value}
                      onClick={() => { setSort(opt.value); setSortOpen(false); }}
                      className={`
                        flex items-center gap-2 px-4 py-2.5 cursor-pointer transition-colors
                        ${sort === opt.value ? "text-brand font-semibold" : "text-gray-700 hover:bg-gray-50"}
                      `}
                    >
                      <span className={`w-3 h-3 rounded-full border-2 flex items-center justify-center shrink-0 ${sort === opt.value ? "border-brand" : "border-gray-300"}`}>
                        {sort === opt.value && <span className="w-1.5 h-1.5 rounded-full bg-brand block" />}
                      </span>
                      {opt.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Grid density */}
            <div className="hidden sm:flex items-center gap-0.5 border border-gray-200 rounded-lg p-0.5">
              <button
                type="button"
                aria-label="4-column grid"
                onClick={() => setCompact(false)}
                className={`p-1.5 rounded-md transition-colors ${!compact ? "bg-gray-900 text-white" : "text-gray-400 hover:text-gray-600"}`}
              >
                <LayoutGrid size={15} aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="5-column grid"
                onClick={() => setCompact(true)}
                className={`p-1.5 rounded-md transition-colors ${compact ? "bg-gray-900 text-white" : "text-gray-400 hover:text-gray-600"}`}
              >
                <LayoutList size={15} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* ── Active filter chips ─────────────────────────────────────── */}
        {totalActive > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {avail.map(v => (
              <span key={v} className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-700 rounded-full px-2.5 py-1">
                {v === "on-sale" ? "On Sale" : "In Stock"}
                <button onClick={() => toggleAvail(v)} className="hover:text-gray-900 ml-0.5">
                  <X size={11} />
                </button>
              </span>
            ))}
            {priceActive > 0 && (
              <span className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-700 rounded-full px-2.5 py-1">
                Dhs.{priceRange[0]} – Dhs.{priceRange[1]}
                <button onClick={() => setPriceRange([priceMin, priceMax])} className="hover:text-gray-900 ml-0.5">
                  <X size={11} />
                </button>
              </span>
            )}
            {[...brandFilter].map(b => (
              <span key={b} className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-700 rounded-full px-2.5 py-1">
                {b}
                <button onClick={() => toggleBrand(b)} className="hover:text-gray-900 ml-0.5">
                  <X size={11} />
                </button>
              </span>
            ))}
            {[...badgeFilter].map(b => (
              <span key={b} className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-700 rounded-full px-2.5 py-1">
                {b}
                <button onClick={() => toggleBadge(b)} className="hover:text-gray-900 ml-0.5">
                  <X size={11} />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* ── Product grid ────────────────────────────────────────────── */}
        {products.length > 0 ? (
          <div
            className={`grid gap-4 md:gap-5 ${
              compact
                ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
                : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
            }`}
          >
            {products.map((p, i) => (
              <div
                key={p.id}
                className="animate-card-in"
                style={{ animationDelay: `${Math.min(i, 16) * 35}ms` }}
              >
                <ProductCard {...p} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-32">
            <PackageOpen size={48} aria-hidden="true" className="text-gray-300" />
            <p className="mt-4 text-gray-400 text-sm">No products match your filters.</p>
            <button
              type="button"
              onClick={clearAll}
              className="mt-5 text-sm font-semibold text-brand hover:text-brand-dark transition-colors"
            >
              Clear filters →
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
