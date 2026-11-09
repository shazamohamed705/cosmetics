/**
 * Button — reusable button component.
 * Variants: "primary" | "outline" | "ghost"
 * Sizes:    "sm" | "md" | "lg"
 */
const variantClasses = {
  primary: "bg-brand text-white hover:bg-brand-dark active:bg-brand-dark focus-visible:ring-brand",
  outline: "border border-brand text-brand hover:bg-brand hover:text-white focus-visible:ring-brand",
  ghost:   "text-brand hover:bg-brand-50 focus-visible:ring-brand",
};

const sizeClasses = {
  sm: "px-4 py-1.5 text-xs",
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-3 text-base",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  as: Tag = "button",
  ...props
}) {
  return (
    <Tag
      className={`
        inline-flex items-center justify-center gap-2 font-medium tracking-wide
        rounded transition-colors duration-200
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
        disabled:opacity-50 disabled:pointer-events-none
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </Tag>
  );
}
