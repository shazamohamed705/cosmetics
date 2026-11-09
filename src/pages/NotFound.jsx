import { Link } from "react-router-dom";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";

export default function NotFound() {
  return (
    <main id="main-content" tabIndex={-1}>
      <section className="py-20">
        <Container>
          <div className="text-center">
            <p className="text-8xl font-serif font-bold text-brand-100">404</p>
            <h1 className="mt-4 font-serif text-3xl font-semibold text-gray-900">Page not found</h1>
            <p className="mt-3 text-gray-500">The page you're looking for doesn't exist or has been moved.</p>
            <div className="mt-8">
              <Button as={Link} to="/">Back to Home</Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
