import { useState } from "react";

/**
 * Newsletter — "Get 10% instant Discount by Joining Mayysa Beauty Club"
 * Full-width section, warm blush background, centered layout.
 */
export default function Newsletter() {
  const [email, setEmail]         = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError]         = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSubmitted(true);
  }

  return (
    <section
      id="newsletter"
      className="relative py-12 sm:py-16 md:py-24 overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('https://mayysa.com/cdn/shop/files/photo-1746124310569-64dce183ec38.avif?v=1781525871&width=1600')`,
      }}
    >
      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 text-center">
        {submitted ? (
          <div className="py-8">
            <p className="font-serif text-xl sm:text-2xl font-semibold text-white">Welcome to the Club! 🎉</p>
            <p className="mt-3 text-sm text-white/70">Your 10% discount code is on its way to your inbox.</p>
          </div>
        ) : (
          <>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold text-black leading-tight">
              Get 10% instant Discount by<br />
              Joining Mayysa Beauty Club{" "}
              <span style={{ color: "#C08666" }}>✦</span>
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-black/80 leading-relaxed px-2">
              Get <span className="font-medium text-black">exclusive offers</span>,{" "}
              <span className="font-medium text-black">early access</span> to launches,{" "}
              beauty tips &amp; members-only rewards.
            </p>

            <form
              onSubmit={handleSubmit}
              noValidate
              className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-2 sm:gap-0 max-w-md mx-auto"
            >
              <label htmlFor="newsletter-email" className="sr-only">Email Address</label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                autoComplete="email"
                className="
                  flex-1 px-4 py-3 text-sm text-gray-800 bg-white
                  border-0
                  rounded sm:rounded-r-none
                  outline-none focus:ring-2 focus:ring-white
                  placeholder-gray-400 shadow-sm
                "
                aria-describedby={error ? "nl-error" : undefined}
              />
              <button
                type="submit"
                className="
                  w-full sm:w-auto px-6 py-3 text-white
                  text-[11px] font-bold uppercase tracking-[0.15em]
                  rounded sm:rounded-l-none
                  transition-colors duration-200
                  whitespace-nowrap shadow-sm
                "
                style={{ backgroundColor: "#46202F" }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = "#5a2a3d"}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = "#46202F"}
              >
                Subscribe
              </button>
            </form>

            {error && (
              <p id="nl-error" role="alert" className="mt-2 text-xs text-red-300">{error}</p>
            )}

            <p className="mt-3 text-xs text-black/50">No spam, ever. Unsubscribe anytime.</p>
          </>
        )}
      </div>
    </section>
  );
}
