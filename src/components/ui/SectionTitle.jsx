/**
 * SectionTitle — consistent heading style for every home section.
 * Props:
 *   title     (string)  — main heading
 *   subtitle  (string)  — optional subtext below
 *   center    (bool)    — center-align (default: true)
 */
export default function SectionTitle({ title, subtitle, center = true }) {
  return (
    <div className={`mb-8 md:mb-12 ${center ? "text-center" : ""}`}>
      <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900 leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-gray-500 text-sm md:text-base max-w-xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
