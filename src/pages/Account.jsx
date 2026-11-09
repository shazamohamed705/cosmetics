import Container from "../components/ui/Container";

export default function Account() {
  return (
    <main id="main-content" tabIndex={-1}>
      <section className="py-12 md:py-20">
        <Container>
          <h1 className="font-serif text-3xl font-semibold text-gray-900 mb-4">My Account</h1>
          <p className="text-gray-400">Login / registration will go here.</p>
        </Container>
      </section>
    </main>
  );
}
