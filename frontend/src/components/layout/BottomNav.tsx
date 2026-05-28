import { NavLink } from "react-router-dom";

import { navigationLinks } from "../../config/navigation";
import { theme } from "../../styles/theme";

export function BottomNav() {
  return (
    <nav className={theme.nav.bottom}>
      <div className="grid grid-cols-4 gap-1">
        {navigationLinks.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `
                ${theme.nav.bottomItem}
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
      </div>
    </nav>
  );
}
