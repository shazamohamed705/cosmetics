import { Outlet, ScrollRestoration } from "react-router-dom";
import AnnouncementBar from "../components/layout/AnnouncementBar";
import Navbar          from "../components/layout/Navbar";
import Footer          from "../components/layout/Footer";

/**
 * MainLayout — shared shell for every page.
 * Structure: AnnouncementBar → Navbar → <Outlet /> → Footer
 * ScrollRestoration resets scroll position on route change.
 */
export default function MainLayout() {
  return (
    <div style={{ overflowX: "hidden", width: "100%" }}>
      {/* Skip-to-main link for keyboard / screen-reader users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2
          focus:z-[100] focus:px-4 focus:py-2 focus:bg-brand focus:text-white
          focus:rounded focus:text-sm focus:font-medium"
      >
        Skip to main content
      </a>

      <AnnouncementBar />
      <Navbar />

      {/* Page content injected here */}
      <Outlet />

      <Footer />
      <ScrollRestoration />
    </div>
  );
}
