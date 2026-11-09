/**
 * SubAnnouncementBar — ثاني شريط إعلاني تحت الـ Navbar.
 * خلفيته #EBDDD5 (نفس لون الـ Navbar).
 * النص بيتحرك بنفس آلية الماركي.
 * المحتوى قابل للتعديل من config/site.js لو أضفت مفتاح subAnnouncement،
 * أو تقدر تغير النصوص مباشرة في الـ array أدناه.
 */

const SUB_MESSAGES = [
  { text: "✦  FREE STANDARD SHIPPING ON ORDERS OVER ", bold: false },
  { text: "AED 150", bold: true },
  { text: "   ✦  EASY RETURNS WITHIN ", bold: false },
  { text: "30 DAYS", bold: true },
  { text: "   ✦  AUTHENTIC PRODUCTS GUARANTEED", bold: false },
  { text: "   ✦  SHOP NOW & SAVE UP TO ", bold: false },
  { text: "30%", bold: true },
  { text: " ON SELECTED ITEMS", bold: false },
];

function Track() {
  return (
    <span className="inline-flex items-center whitespace-nowrap px-12">
      {SUB_MESSAGES.map((seg, i) =>
        seg.bold ? (
          <strong key={i} className="font-semibold text-brand-dark">
            {seg.text}
          </strong>
        ) : (
          <span key={i}>{seg.text}</span>
        )
      )}
    </span>
  );
}

export default function SubAnnouncementBar() {
  return (
    <div
      style={{ backgroundColor: "#EBDDD5" }}
      className="w-full h-9 flex items-center overflow-hidden border-b border-black/5 text-[11px] tracking-widest uppercase text-gray-700"
      aria-label="Promotions"
    >
      {/* نفس تقنية الـ marquee — نكرر المحتوى 4 مرات × 2 track */}
      <div className="animate-marquee" aria-hidden="true">
        {Array.from({ length: 4 }).map((_, i) => <Track key={`a${i}`} />)}
        {Array.from({ length: 4 }).map((_, i) => <Track key={`b${i}`} />)}
      </div>
    </div>
  );
}
