import { NavLink } from "react-router-dom";
import { navigationLinks } from "../../config/navigation";

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-800 bg-slate-950/95 px-2 py-2 backdrop-blur md:hidden">
      <div className="grid grid-cols-4 gap-1">
        {navigationLinks.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `
                flex flex-col items-center justify-center gap-1
                rounded-xl px-2 py-2 text-xs transition
                ${
                  isActive
                    ? "bg-[#28922b] text-white"
                    : "text-slate-400 hover:text-cyan-300"
                }
              `
            }
          >
            <Icon size={20} />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
