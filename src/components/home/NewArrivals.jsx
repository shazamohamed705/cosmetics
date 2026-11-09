import { Link } from "react-router-dom";
import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import ProductCard from "../ui/ProductCard";
import Button from "../ui/Button";

/**
 * NewArrivals — same layout as BestSellers but for fresh stock.
 * Props: { products: ProductCard[] }
 */
export default function NewArrivals({ products }) {
  return (
    <section id="new-arrivals" className="py-12 md:py-20">
      <Container>
        <SectionTitle title="New Arrivals" subtitle="Fresh picks just landed in our store." />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button as={Link} to="/collections/new-arrivals" variant="outline">
            See All New Arrivals
          </Button>
        </div>
      </Container>
    </section>
  );
}
