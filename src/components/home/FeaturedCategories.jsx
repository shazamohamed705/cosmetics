import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";

export default function FeaturedCategories({ categories }) {
  const scrollRef = useRef(null);
  const [canScrollLeft,  setCanScrollLeft]  = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateArrows = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -260 : 260, behavior: "smooth" });
    setTimeout(updateArrows, 350);
  };

  return (
    <section id="categories" className="py-10 md:py-16">
      <Container>
        <SectionTitle title="Shop By Category" />

        <div className="relative">
          {/* Arrows — hidden on mobile, show on md+ */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10
                w-9 h-9 rounded-full bg-white shadow-md border border-gray-200
                items-center justify-center hover:bg-gray-50 transition"
            >
              <ChevronLeft size={16} className="text-gray-600" />
            </button>
          )}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10
                w-9 h-9 rounded-full bg-white shadow-md border border-gray-200
                items-center justify-center hover:bg-gray-50 transition"
            >
              <ChevronRight size={16} className="text-gray-600" />
            </button>
          )}

          {/* Scrollable row — snap on mobile */}
          <div
            ref={scrollRef}
            onScroll={updateArrows}
            className="flex gap-3 sm:gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 hide-scrollbar"
          >
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="
                  snap-start flex-none
                  w-[160px] xs:w-[180px] sm:w-[200px] md:w-[220px]
                  rounded-xl border border-gray-200 bg-white overflow-hidden
                  shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col
                "
              >
                {/* Hero image */}
                <div className="w-full h-36 sm:h-44 overflow-hidden bg-gray-100">
                  {cat.image ? (
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300 text-4xl font-serif">
                      {cat.name.charAt(0)}
                    </div>
                  )}
                </div>

                {/* Card body */}
                <div className="p-2.5 sm:p-3 flex flex-col gap-2 flex-1">
                  <div>
                    <h3 className="text-xs sm:text-sm font-semibold text-gray-800 leading-snug">{cat.name}</h3>
                    {cat.count != null && (
                      <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">{cat.count} Products</p>
                    )}
                  </div>

                  {/* Subcategory thumbnails */}
                  {cat.subImages && cat.subImages.length > 0 && (
                    <div className="grid grid-cols-4 gap-1">
                      {cat.subImages.slice(0, 8).map((img, i) => (
                        <div key={i} className="aspect-square rounded overflow-hidden bg-gray-100">
                          <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
                        </div>
                      ))}
                    </div>
                  )}

                  <Link
                    to={cat.to}
                    className="mt-auto block text-center text-xs sm:text-sm font-medium text-gray-700
                      bg-[#e8c5c5] hover:bg-[#d9a8a8] rounded-full py-1.5 sm:py-2
                      transition-colors duration-200"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
