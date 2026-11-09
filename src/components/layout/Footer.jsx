import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import Logo from "./Logo";
import { SITE_CONFIG } from "../../config/site";

/* ── Link columns data ───────────────────────────── */
const columns = [
  {
    heading: "Shop",
    links: [
      { label: "Skincare",              to: "/collections/skincare" },
      { label: "Hair Products",         to: "/collections/hair-products" },
      { label: "Health Care",           to: "/collections/health-care" },
      { label: "Bath & Body Care",      to: "/collections/bath-body-care" },
      { label: "Fragrance",             to: "/collections/fragrance" },
      { label: "Makeup",                to: "/collections/makeup" },
      { label: "Accessories & Lenses",  to: "/collections/accessories-lenses" },
    ],
  },
  {
    heading: "Mayysa",
    links: [
      { label: "Wholesale/B2B",         to: "/wholesale" },
      { label: "Search",                to: "/search" },
      { label: "About Us",              to: "/about" },
      { label: "Our Story",             to: "/our-story" },
      { label: "Affiliates",            to: "/affiliates" },
    ],
  },
  {
    heading: "Quick Links",
    links: [
      { label: "Contact Us",            to: "/contact" },
      { label: "Shipping Policy",       to: "/shipping" },
      { label: "Return & Refund Policy",to: "/returns" },
      { label: "Privacy Policy",        to: "/privacy" },
    ],
  },
];

/* ── Social icons ────────────────────────────────── */
function IconInstagram() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4.5"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}
function IconTikTok() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.77a4.85 4.85 0 0 1-1.01-.08z"/>
    </svg>
  );
}
function IconYoutube() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/>
    </svg>
  );
}
function IconWhatsApp() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
    </svg>
  );
}
function IconFacebook() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

const socials = [
  { Icon: IconInstagram, label: "Instagram",  href: "https://instagram.com" },
  { Icon: IconTikTok,    label: "TikTok",     href: "https://tiktok.com" },
  { Icon: IconYoutube,   label: "YouTube",    href: "https://youtube.com" },
  { Icon: IconWhatsApp,  label: "WhatsApp",   href: "https://wa.me" },
  { Icon: IconFacebook,  label: "Facebook",   href: "https://facebook.com" },
];

/* ── Payment icons (inline SVG paths) ───────────────────────────── */
const paymentIcons = [
  { id: "amex",       label: "American Express", color: "#2671B9", text: "AMEX" },
  { id: "applepay",   label: "Apple Pay",         color: "#000",    text: "Apple Pay" },
  { id: "diners",     label: "Diners Club",       color: "#004B97", text: "Diners" },
  { id: "discover",   label: "Discover",          color: "#FF6600", text: "Discover" },
  { id: "googlepay",  label: "Google Pay",        color: "#4285F4", text: "G Pay" },
  { id: "jcb",        label: "JCB",               color: "#003087", text: "JCB" },
  { id: "mastercard", label: "Mastercard",        color: "#EB001B", text: "MC" },
  { id: "visa",       label: "Visa",              color: "#1A1F71", text: "VISA" },
];

/* ── Accordion item for mobile ───────────────────────────────────── */
function AccordionColumn({ heading, links }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-4 text-left"
        aria-expanded={open}
      >
        <span className="text-xs font-semibold uppercase tracking-widest text-gray-900">
          {heading}
        </span>
        <ChevronDown
          size={16}
          className={`text-gray-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>
      {open && (
        <ul className="pb-4 space-y-3 pl-0">
          {links.map((l) => (
            <li key={l.to}>
              <Link to={l.to} className="text-sm text-brand hover:underline transition-colors">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ── Main Footer ─────────────────────────────────── */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: "#fdf8f5" }} className="border-t border-gray-200">

      {/* ── Top section ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-14">

        {/* Desktop: 4-column grid */}
        <div className="hidden md:grid md:grid-cols-4 gap-10 lg:gap-16">
          {columns.map(({ heading, links }) => (
            <div key={heading}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-900 border-b border-gray-300 pb-3 mb-5">
                {heading}
              </h3>
              <ul className="space-y-3">
                {links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-sm text-brand hover:underline transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Brand column */}
          <div className="flex flex-col gap-5">
            {/* Logo */}
            <Logo />

            {/* Social icons */}
            <div className="flex gap-3 flex-wrap">
              {socials.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-gray-600 hover:text-brand transition-colors"
                >
                  <Icon />
                </a>
              ))}
            </div>

            {/* Contact */}
            <div className="space-y-2 text-sm text-gray-600">
              <a href="mailto:info@mayysa.com" className="flex items-center gap-2 hover:text-brand transition-colors">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="M2 7l10 7 10-7"/>
                </svg>
                info@mayysa.com
              </a>
              <a href="https://wa.me" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-brand transition-colors">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                </svg>
                WhatsApp Inquiries
              </a>
            </div>
          </div>
        </div>

        {/* Mobile: accordion columns + brand block */}
        <div className="md:hidden">
          {columns.map(({ heading, links }) => (
            <AccordionColumn key={heading} heading={heading} links={links} />
          ))}

          {/* Brand block below accordion */}
          <div className="pt-8 flex flex-col gap-5">
            <Logo />
            <div className="flex gap-4 flex-wrap">
              {socials.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-gray-600 hover:text-brand transition-colors"
                >
                  <Icon />
                </a>
              ))}
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <a href="mailto:info@mayysa.com" className="flex items-center gap-2 hover:text-brand transition-colors">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="M2 7l10 7 10-7"/>
                </svg>
                info@mayysa.com
              </a>
              <a href="https://wa.me" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-brand transition-colors">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                </svg>
                WhatsApp Inquiries
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Currency selector */}
          <div className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-gray-500 shrink-0" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/>
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z"/>
            </svg>
            <select
              defaultValue="AED"
              className="text-xs text-gray-700 bg-transparent border border-gray-300 rounded px-2 py-1.5 pr-6 appearance-none cursor-pointer focus:outline-none focus:border-brand"
              aria-label="Select currency and country"
            >
              <option value="AED">🇦🇪 Jordan (AED)</option>
              <option value="USD">🇺🇸 USA (USD)</option>
              <option value="SAR">🇸🇦 KSA (SAR)</option>
              <option value="GBP">🇬🇧 UK (GBP)</option>
            </select>
            <ChevronDown size={12} className="text-gray-400 -ml-5 pointer-events-none" aria-hidden="true" />
          </div>

          {/* Copyright */}
          <p className="text-xs text-gray-400 order-last sm:order-none">
            © {year} {SITE_CONFIG.name}. All rights reserved.
          </p>

          {/* Payment icons */}
          <div className="flex items-center gap-1.5 flex-wrap justify-center" aria-label="Accepted payment methods">
            {paymentIcons.map(({ id, label, color, text }) => (
              <span
                key={id}
                title={label}
                aria-label={label}
                className="inline-flex items-center justify-center h-6 px-1.5 rounded border border-gray-200 bg-white text-[9px] font-bold tracking-tight"
                style={{ color, minWidth: "36px" }}
              >
                {text}
              </span>
            ))}
          </div>

        </div>
      </div>
    </footer>
  );
}
