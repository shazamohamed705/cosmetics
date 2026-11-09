import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, Search, User, ShoppingBag } from "lucide-react";
import Logo from "./Logo";
import CurrencyDropdown from "./CurrencyDropdown";
import MobileDrawer from "./MobileDrawer";
import SearchOverlay from "./SearchOverlay";
import AuthModal from "./AuthModal";
import CartDrawer from "./CartDrawer";
import NavDropdown from "./NavDropdown";
import { SITE_CONFIG } from "../../config/site";
import { useCart } from "../../context/CartContext";
import { useFlyingCart } from "../../context/FlyingCartContext";

/**
 * Navbar — sticky main header.
 * Desktop: logo | nav links | currency + icons
 * Mobile:  hamburger | logo | icons
 */
export default function Navbar() {
  const [scrolled, setScrolled]         = useState(false);
  const [drawerOpen, setDrawerOpen]     = useState(false);
  const [searchOpen, setSearchOpen]     = useState(false);
  const [authOpen, setAuthOpen]         = useState(false);
  const [cartOpen, setCartOpen]         = useState(false);
  const { itemCount }                   = useCart();
  const { cartIconRef }                 = useFlyingCart();
  const hamburgerRef                    = useRef(null);
  const location                        = useLocation();

  // Sticky shadow on scroll
  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 8); }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Return focus to hamburger when drawer closes
  function handleDrawerClose() {
    setDrawerOpen(false);
    hamburgerRef.current?.focus();
  }

  return (
    <>
      <header
        style={{ backgroundColor: "#faf7f5" }}
        className={`sticky top-0 z-30 transition-shadow duration-300 ${
          scrolled ? "shadow-md" : "shadow-sm"
        }`}
      >
        <nav
          aria-label="Main navigation"
          className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2"
        >
          {/* ── Mobile: hamburger ── */}
          <button
            ref={hamburgerRef}
            type="button"
            aria-label="Open navigation menu"
            aria-expanded={drawerOpen}
            aria-controls="mobile-drawer"
            onClick={() => setDrawerOpen(true)}
            className="lg:hidden p-2 -ml-1 rounded hover:bg-black/10 transition-colors text-gray-700"
          >
            <Menu size={22} aria-hidden="true" />
          </button>

          {/* ── Logo + Desktop nav links (pushed right) ── */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-5 ml-auto">
            <Logo />
            <ul className="flex items-center gap-3 xl:gap-5 list-none m-0 p-0">
            {SITE_CONFIG.navLinks.map((link) =>
              link.dropdownItems?.length ? (
                <NavDropdown
                  key={link.to}
                  link={link}
                  isActive={location.pathname.startsWith(link.to)}
                />
              ) : (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `relative text-[11px] xl:text-[12px] font-medium uppercase tracking-tight whitespace-nowrap
                       transition-colors duration-200 pb-0.5
                       after:absolute after:left-0 after:bottom-0 after:h-[1.5px] after:bg-brand
                       after:transition-all after:duration-200
                       ${
                         isActive
                           ? "text-brand after:w-full"
                           : "text-gray-800 hover:text-brand after:w-0 hover:after:w-full"
                       }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              )
            )}
            </ul>
          </div>

          {/* Mobile logo (centered) */}
          <div className="lg:hidden mx-auto">
            <Logo />
          </div>

          {/* ── Right actions ── */}
          <div className="flex items-center gap-1 shrink-0">
            {/* Currency (desktop only) */}
            <div className="hidden lg:block">
              <CurrencyDropdown />
            </div>

            {/* Search */}
            <button
              type="button"
              aria-label="Open search"
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded hover:bg-black/10 transition-colors text-gray-700 hover:text-brand"
            >
              <Search size={20} aria-hidden="true" />
            </button>

            {/* Account */}
            <button
              type="button"
              aria-label="My account"
              onClick={() => setAuthOpen(true)}
              className="p-2 rounded hover:bg-black/10 transition-colors text-gray-700 hover:text-brand"
            >
              <User size={20} aria-hidden="true" />
            </button>

            {/* Cart */}
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              aria-label={`Shopping cart, ${itemCount} ${itemCount === 1 ? "item" : "items"}`}
              className="relative p-2 rounded hover:bg-black/10 transition-colors text-gray-700 hover:text-brand"
            >
              <span ref={cartIconRef} className="block">
                <ShoppingBag size={20} aria-hidden="true" />
              </span>
              {itemCount > 0 && (
                <span
                  key={itemCount}
                  aria-hidden="true"
                  className="animate-cart-pop absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center
                    bg-brand-dark text-white text-[10px] font-bold rounded-full px-1 leading-none ring-2 ring-white"
                >
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      <MobileDrawer open={drawerOpen} onClose={handleDrawerClose} id="mobile-drawer" />

      {/* Search overlay */}
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Auth modal (popup) */}
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />

      {/* Cart drawer */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
