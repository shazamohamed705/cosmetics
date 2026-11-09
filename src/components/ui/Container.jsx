/**
 * Container — max-width wrapper used by every section.
 * Change `max-w-7xl` here to resize content width site-wide.
 */
export default function Container({ children, className = "" }) {
  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}
