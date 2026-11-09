import { useEffect, useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";

/**
 * AuthDrawer — slide-in panel with Sign In / Sign Up tabs.
 * Opens when the user clicks the account icon in the Navbar.
 */
export default function AuthDrawer({ open, onClose }) {
  const [tab, setTab] = useState("signin"); // "signin" | "signup"
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Reset state when drawer closes
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setTab("signin");
        setShowPass(false);
        setShowConfirm(false);
      }, 300);
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Drawer panel — slides from the right */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Account"
        className={`fixed top-0 right-0 z-50 h-full w-80 bg-white shadow-xl flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <span className="font-serif text-xl text-brand-dark font-semibold">My Account</span>
          <button
            onClick={onClose}
            aria-label="Close account panel"
            className="p-1 rounded hover:bg-gray-100 transition-colors text-gray-500"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100">
          <button
            onClick={() => setTab("signin")}
            className={`flex-1 py-3 text-sm font-semibold uppercase tracking-wide transition-colors ${
              tab === "signin"
                ? "text-brand border-b-2 border-brand"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setTab("signup")}
            className={`flex-1 py-3 text-sm font-semibold uppercase tracking-wide transition-colors ${
              tab === "signup"
                ? "text-brand border-b-2 border-brand"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form area */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
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
    </>
  );
}

/* ─── Sign In Form ─── */
function SignInForm({ showPass, setShowPass, onClose }) {
  function handleSubmit(e) {
    e.preventDefault();
    // TODO: connect to auth API
    onClose();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <p className="text-sm text-gray-500 mb-2">
        Welcome back! Sign in to your account.
      </p>

      <div>
        <label htmlFor="signin-email" className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
          Email
        </label>
        <input
          id="signin-email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition"
        />
      </div>

      <div>
        <label htmlFor="signin-password" className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
          Password
        </label>
        <div className="relative">
          <input
            id="signin-password"
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
            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
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
        className="w-full bg-brand-dark text-white py-2.5 rounded-lg text-sm font-semibold uppercase tracking-wide hover:bg-brand transition-colors mt-2"
      >
        Sign In
      </button>
    </form>
  );
}

/* ─── Sign Up Form ─── */
function SignUpForm({ showPass, setShowPass, showConfirm, setShowConfirm, onClose }) {
  function handleSubmit(e) {
    e.preventDefault();
    // TODO: connect to auth API
    onClose();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <p className="text-sm text-gray-500 mb-2">
        Create a new account to get started.
      </p>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="signup-first" className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
            First Name
          </label>
          <input
            id="signup-first"
            type="text"
            autoComplete="given-name"
            required
            placeholder="Jane"
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition"
          />
        </div>
        <div>
          <label htmlFor="signup-last" className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
            Last Name
          </label>
          <input
            id="signup-last"
            type="text"
            autoComplete="family-name"
            required
            placeholder="Doe"
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition"
          />
        </div>
      </div>

      <div>
        <label htmlFor="signup-email" className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
          Email
        </label>
        <input
          id="signup-email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition"
        />
      </div>

      <div>
        <label htmlFor="signup-password" className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
          Password
        </label>
        <div className="relative">
          <input
            id="signup-password"
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
            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      <div>
        <label htmlFor="signup-confirm" className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
          Confirm Password
        </label>
        <div className="relative">
          <input
            id="signup-confirm"
            type={showConfirm ? "text" : "password"}
            autoComplete="new-password"
            required
            placeholder="••••••••"
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 pr-10 text-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition"
          />
          <button
            type="button"
            onClick={() => setShowConfirm((v) => !v)}
            aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-brand-dark text-white py-2.5 rounded-lg text-sm font-semibold uppercase tracking-wide hover:bg-brand transition-colors mt-2"
      >
        Create Account
      </button>
    </form>
  );
}
