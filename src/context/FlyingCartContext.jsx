import { createContext, useContext, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";

/**
 * FlyingCartContext
 * ─────────────────
 * Exposes:
 *   • cartIconRef   – attach to the <ShoppingBag> icon in Navbar
 *   • flyToCart(buttonEl) – call with the "Add to Cart" button element
 *
 * Renders flying dots via a portal so they're never clipped by
 * overflow:hidden on cards or sections.
 */

const FlyingCartContext = createContext(null);

export function FlyingCartProvider({ children }) {
  const cartIconRef = useRef(null);
  const [particles, setParticles] = useState([]); // [{ id, x1,y1,x2,y2 }]

  const flyToCart = useCallback((buttonEl) => {
    if (!cartIconRef.current || !buttonEl) return;

    const btnRect  = buttonEl.getBoundingClientRect();
    const iconRect = cartIconRef.current.getBoundingClientRect();

    // start = centre of button
    const x1 = btnRect.left  + btnRect.width  / 2;
    const y1 = btnRect.top   + btnRect.height / 2;

    // end = centre of cart icon
    const x2 = iconRect.left + iconRect.width  / 2;
    const y2 = iconRect.top  + iconRect.height / 2;

    const id = Date.now() + Math.random();

    setParticles((prev) => [...prev, { id, x1, y1, x2, y2 }]);

    // remove after animation completes (750ms)
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== id));
    }, 800);
  }, []);

  return (
    <FlyingCartContext.Provider value={{ cartIconRef, flyToCart }}>
      {children}
      {createPortal(
        <>
          {particles.map((p) => (
            <FlyingDot key={p.id} {...p} />
          ))}
        </>,
        document.body
      )}
    </FlyingCartContext.Provider>
  );
}

export function useFlyingCart() {
  const ctx = useContext(FlyingCartContext);
  if (!ctx) throw new Error("useFlyingCart must be used inside <FlyingCartProvider>");
  return ctx;
}

/* ─── Single flying dot ────────────────────────────────────────────────── */
function FlyingDot({ id, x1, y1, x2, y2 }) {
  // Unique path id so multiple dots don't share the same <path>
  const pathId = `arc-${id}`;

  // Bezier control point — arc upward between the two points
  const cx = (x1 + x2) / 2;
  const cy = Math.min(y1, y2) - 120; // how high the arc goes

  return (
    <svg
      aria-hidden="true"
      style={{
        position:      "fixed",
        top:           0,
        left:          0,
        width:         "100vw",
        height:        "100vh",
        pointerEvents: "none",
        zIndex:        9999,
        overflow:      "visible",
      }}
    >
      {/* Invisible path used for animateMotion */}
      <path
        id={pathId}
        d={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`}
        fill="none"
        stroke="none"
      />

      {/* The dot */}
      <circle r="7" fill="#C08666">
        <animateMotion
          dur="0.65s"
          keyTimes="0;0.5;1"
          keySplines="0.4 0 0.2 1;0.4 0 0.2 1"
          calcMode="spline"
          fill="freeze"
        >
          <mpath href={`#${pathId}`} />
        </animateMotion>
        {/* shrink + fade as it reaches the cart */}
        <animate
          attributeName="r"
          values="7;9;4"
          keyTimes="0;0.4;1"
          dur="0.65s"
          fill="freeze"
        />
        <animate
          attributeName="opacity"
          values="1;1;0"
          keyTimes="0;0.7;1"
          dur="0.65s"
          fill="freeze"
        />
      </circle>
    </svg>
  );
}
