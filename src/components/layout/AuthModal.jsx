import { useEffect, useState } from "react";
import { X, Eye, EyeOff, Sparkles } from "lucide-react";

/**
 * AuthModal — split layout popup: product image left | form right.
 * Opens when the user clicks the account (User) icon in the Navbar.
 */
export default function AuthModal({ open, onClose }) {
  const [tab, setTab] = useState("signin");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Reset on close
  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => {
        setTab("signin");
        setShowPass(false);
        setShowConfirm(false);
      }, 250);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handle = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, [open, onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300
          ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Account"
        className={`fixed z-50 inset-0 flex items-center justify-center p-4 transition-all duration-300
          ${open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}`}
      >
        <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden flex min-h-[520px]">

          {/* ── Left Panel — Product Image ───────────────────── */}
          <div
            className="hidden md:flex w-[45%] flex-col items-center justify-end relative overflow-hidden"
            style={{ backgroundColor: "#e8d9c4" }}
          >
            {/* Decorative circles */}
            <div className="absolute top-6 left-6 w-20 h-20 rounded-full bg-white/30" />
            <div className="absolute top-16 right-4 w-10 h-10 rounded-full bg-brand/20" />
            <div className="absolute bottom-40 left-4 w-6 h-6 rounded-full bg-brand-dark/20" />

            {/* Badge */}
            <div className="absolute top-8 right-6 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-sm">
              <Sparkles size={12} className="text-brand" />
              <span className="text-[11px] font-bold text-brand-dark tracking-wide uppercase">New Arrivals</span>
            </div>

            {/* Headline */}
            <div className="absolute top-1/4 left-6 right-6 text-center">
              <p className="font-serif text-2xl font-semibold text-brand-dark leading-snug">
                Glow Starts<br />
                <em>From Within</em>
              </p>
              <p className="mt-2 text-xs text-brand-dark/70 leading-relaxed">
                Discover skincare rituals<br />crafted for radiant skin.
              </p>
            </div>

            {/* Product image */}
            <img
              src="https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&q=85&auto=format&fit=crop"
              alt="Cleanser product"
              className="w-full h-[260px] object-cover object-top"
              loading="lazy"
            />
          </div>

          {/* ── Right Panel — Form ───────────────────────────── */}
          <div className="flex-1 flex flex-col px-8 py-8 overflow-y-auto">

            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100 transition-colors text-gray-400 z-10"
            >
              <X size={18} aria-hidden="true" />
            </button>

            {/* Header */}
            <div className="mb-5">
              <h2 className="font-serif text-2xl font-semibold text-brand-dark">My Account</h2>
              <p className="text-xs text-gray-400 mt-1">
                {tab === "signin" ? "Welcome back — sign in to continue." : "Join us and start your glow journey."}
              </p>
            </div>

            {/* Tabs */}
            <div className="flex rounded-full bg-gray-100 p-1 mb-6">
              <button
                onClick={() => setTab("signin")}
                className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-all ${
                  tab === "signin"
                    ? "bg-white text-brand shadow-sm"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setTab("signup")}
                className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-all ${
                  tab === "signup"
                    ? "bg-white text-brand shadow-sm"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Form */}
            {tab === "signin" ? (
              <SignInForm showPass={showPass} setShowPass={setShowPass} onClose={onClose} />
            ) : (
              <SignUpForm
                showPass={showPass}
                setShowPass={setShowPass}
                showConfirm={showConfirm}
                setShowConfirm={setShowConfirm}
                onClose={onClose}
              />
            )}
          </div>

        </div>
      </div>
    </>
  );
}

/* ─── Sign In ─── */
function SignInForm({ showPass, setShowPass, onClose }) {
  function handleSubmit(e) {
    e.preventDefault();
    // TODO: connect to auth API
    onClose();
  }
  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor="si-email" className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
          Email
        </label>
        <input
          id="si-email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition"
        />
      </div>

      <div>
        <label htmlFor="si-password" className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
          Password
        </label>
        <div className="relative">
          <input
            id="si-password"
            type={showPass ? "text" : "password"}
            autoComplete="current-password"
            required
            placeholder="••••••••"
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 pr-10 text-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition"
          />
          <button
            type="button"
            onClick={() => setShowPass((v) => !v)}
            aria-label={showPass ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>
        <div className="text-right mt-1">
          <button type="button" className="text-xs text-brand hover:underline">
            Forgot password?
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-brand-dark text-white py-2.5 rounded-lg text-sm font-semibold uppercase tracking-wide hover:bg-brand transition-colors"
      >
        Sign In
      </button>
    </form>
  );
}

/* ─── Sign Up ─── */
function SignUpForm({ showPass, setShowPass, showConfirm, setShowConfirm, onClose }) {
  function handleSubmit(e) {
    e.preventDefault();
    // TODO: connect to auth API
    onClose();
  }
  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="su-first" className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
            First Name
          </label>
          <input
            id="su-first"
            type="text"
            autoComplete="given-name"
            required
            placeholder="Jane"
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition"
          />
        </div>
        <div>
          <label htmlFor="su-last" className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
            Last Name
          </label>
          <input
            id="su-last"
            type="text"
            autoComplete="family-name"
            required
            placeholder="Doe"
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition"
          />
        </div>
      </div>

      <div>
        <label htmlFor="su-email" className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
          Email
        </label>
        <input
          id="su-email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition"
        />
      </div>

      <div>
        <label htmlFor="su-password" className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
          Password
        </label>
        <div className="relative">
          <input
            id="su-password"
            type={showPass ? "text" : "password"}
            autoComplete="new-password"
            required
            placeholder="••••••••"
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 pr-10 text-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition"
          />
          <button
            type="button"
            onClick={() => setShowPass((v) => !v)}
            aria-label={showPass ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>
      </div>

      <div>
        <label htmlFor="su-confirm" className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
          Confirm Password
        </label>
        <div className="relative">
          <input
            id="su-confirm"
            type={showConfirm ? "text" : "password"}
            autoComplete="new-password"
            required
            placeholder="••••••••"
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 pr-10 text-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition"
          />
          <button
            type="button"
            onClick={() => setShowConfirm((v) => !v)}
            aria-label={showConfirm ? "Hide" : "Show"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-brand-dark text-white py-2.5 rounded-lg text-sm font-semibold uppercase tracking-wide hover:bg-brand transition-colors"
      >
        Create Account
      </button>
    </form>
  );
}
