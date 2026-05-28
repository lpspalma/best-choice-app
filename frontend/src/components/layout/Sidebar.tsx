import { LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";

import { navigationLinks } from "../../config/navigation";
import { useAuth } from "../../context/useAuth";
import { theme } from "../../styles/theme";

export function Sidebar() {
  const { logout } = useAuth();

  return (
    <aside className={theme.nav.sidebar}>
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-app-text">Best Choice</h1>

        <p className={`text-sm ${theme.text.subtitle}`}>
          Make your predictions
        </p>
      </div>

      <nav className="flex flex-1 flex-col gap-2">
        {navigationLinks.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `
                ${theme.nav.navItem}
                ${
                  isActive ? theme.nav.navItemActive : theme.nav.navItemInactive
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
        className={`
          mt-6
          ${theme.nav.navItem}
          text-app-muted
          hover:bg-app-dangerSoft
          hover:text-app-danger
        `}
      >
        <LogOut size={20} />

        <span>Logout</span>
      </button>
    </aside>
  );
}
