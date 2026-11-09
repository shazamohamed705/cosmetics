import { Link } from "react-router-dom";
import { SITE_CONFIG } from "../../config/site";

/**
 * Logo — SVG wordmark with leaf ornament.
 * Swap out the SVG below with your actual brand logo file when ready.
 * The font used inline is Playfair Display (loaded via index.css).
 */
export default function Logo() {
  return (
    <Link
      to="/"
      aria-label={`${SITE_CONFIG.name} — home`}
      className="flex items-center shrink-0"
    >
      <svg
        width="160"
        height="50"
        viewBox="0 0 200 55"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Leaf ornament left */}
        <g transform="translate(4,10)">
          <path
            d="M10 20 Q2 12 8 4 Q14 12 10 20Z"
            fill="#C08666"
            opacity="0.9"
          />
          <path
            d="M14 22 Q6 16 10 6 Q18 14 14 22Z"
            fill="#C08666"
            opacity="0.6"
          />
          <line x1="10" y1="4" x2="10" y2="22" stroke="#C08666" strokeWidth="0.7" />
        </g>
        {/* Brand name */}
        <text
          x="28"
          y="40"
          fontFamily="'Playfair Display', Georgia, serif"
          fontSize="32"
          fontWeight="400"
          fill="#7a4f32"
          letterSpacing="-0.5"
        >
          {SITE_CONFIG.name}
        </text>
      </svg>
    </Link>
  );
}
