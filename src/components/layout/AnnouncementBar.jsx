import { SITE_CONFIG } from "../../config/site";

/**
 * AnnouncementBar — full-width scrolling marquee bar above the navbar.
 * Background: #C18665 (brand color).
 * The text loops seamlessly by duplicating the content track.
 * Hovering pauses the animation.
 */
export default function AnnouncementBar() {
  const { segments } = SITE_CONFIG.announcement;

  /* Build the message once as JSX, then duplicate it for seamless loop */
  const Message = () => (
    <span className="inline-flex items-center gap-1 px-16 whitespace-nowrap text-white text-xs tracking-widest uppercase select-none">
      {segments.map((seg, i) =>
        seg.bold ? (
          <strong key={i} className="font-bold">
            {seg.text}
          </strong>
        ) : (
          <span key={i} className="font-normal">
            {seg.text}
          </span>
        )
      )}
      {/* small separator dot between repeats */}
      <span className="mx-8 opacity-60">✦</span>
    </span>
  );

  return (
    <div
      style={{ backgroundColor: "#C18665" }}
      className="w-full h-10 flex items-center overflow-hidden"
      role="banner"
      aria-label="Announcement"
    >
      {/*
        Two identical tracks side-by-side.
        The animation slides left by exactly 50%, so when the first
        track exits, the second seamlessly takes its place.
      */}
      <div className="animate-marquee" aria-hidden="false">
        {/* Track 1 — visible */}
        {Array.from({ length: 4 }).map((_, i) => (
          <Message key={`a-${i}`} />
        ))}
        {/* Track 2 — mirror for seamless wrap */}
        {Array.from({ length: 4 }).map((_, i) => (
          <Message key={`b-${i}`} />
        ))}
      </div>
    </div>
  );
}
