import { LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { navigationLinks } from "../../config/navigation";

export function Sidebar() {
  const { logout } = useAuth();

  return (
    <aside className="hidden w-64 flex-col border-r border-slate-800 bg-slate-950/80 p-4 md:flex">
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-white">Best Choice</h1>

        <p className="text-sm text-slate-400">Make your predictions</p>
      </div>

      <nav className="flex flex-1 flex-col gap-2">
        {navigationLinks.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `
                flex items-center gap-3 rounded-xl px-4 py-3 transition
                ${
                  isActive
                    ? "bg-[#28922b] text-white"
                    : "text-slate-300 hover:bg-slate-900"
                }
              `
            }
          >
            <Icon size={20} />

            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <button
        onClick={logout}
        className="
          mt-6 flex items-center gap-3 rounded-xl
          px-4 py-3 text-slate-300 transition
          hover:bg-red-500/10 hover:text-red-400
        "
      >
        <LogOut size={20} />

        <span>Logout</span>
      </button>
    </aside>
  );
}
