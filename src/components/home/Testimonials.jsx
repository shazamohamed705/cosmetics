import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import { Star } from "lucide-react";

/**
 * Testimonials — customer review cards.
 * Props: { testimonials: [{ id, name, location, rating, text }] }
 */
export default function Testimonials({ testimonials }) {
  return (
    <section id="testimonials" className="py-12 md:py-20">
      <Container>
        <SectionTitle title="What Our Customers Say" subtitle="Real reviews from real people." />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <article
              key={t.id}
              className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4" aria-label={`Rating: ${t.rating} out of 5`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    aria-hidden="true"
                    className={i < t.rating ? "fill-brand text-brand" : "text-gray-200 fill-gray-200"}
                  />
                ))}
              </div>

              <blockquote>
                <p className="text-sm text-gray-700 leading-relaxed">"{t.text}"</p>
              </blockquote>

              <footer className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                <p className="text-xs text-gray-400">{t.location}</p>
              </footer>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
