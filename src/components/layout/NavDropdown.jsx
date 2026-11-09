import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

/**
 * NavDropdown — hover dropdown for desktop nav links.
 * Shows a caret on the parent link and a panel on hover.
 */
export default function NavDropdown({ link, isActive }) {
  return (
    <li className="relative group list-none">
      {/* Parent link */}
      <Link
        to={link.to}
        className={`relative flex items-center gap-0.5 text-[11px] xl:text-[12px] font-medium uppercase tracking-tight
          whitespace-nowrap transition-colors duration-200 pb-0.5
          after:absolute after:left-0 after:bottom-0 after:h-[1.5px] after:bg-brand
          after:transition-all after:duration-200
          ${
            isActive
              ? "text-brand after:w-full"
              : "text-gray-800 hover:text-brand after:w-0 group-hover:after:w-full"
          }`}
      >
        {link.label}
        <ChevronDown
          size={13}
          aria-hidden="true"
          className="mt-px transition-transform duration-200 group-hover:rotate-180 shrink-0"
        />
      </Link>

      {/* Dropdown panel */}
      <div
        className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50
          opacity-0 pointer-events-none translate-y-1
          group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0
          transition-all duration-200 ease-out"
      >
        {/* Arrow tip */}
        <div className="absolute top-[6px] left-1/2 -translate-x-1/2 w-3 h-3
          bg-white rotate-45 border-l border-t border-gray-100 shadow-sm" />

        <ul
          className="relative bg-white border border-gray-100 rounded-xl shadow-lg
            min-w-[180px] py-2 overflow-hidden"
        >
          {link.dropdownItems.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className="block px-5 py-2.5 text-[13px] text-gray-700 hover:text-brand
                  hover:bg-brand-50 transition-colors duration-150 whitespace-nowrap"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}
