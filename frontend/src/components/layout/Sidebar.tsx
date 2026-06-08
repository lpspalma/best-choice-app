import { NavLink } from "react-router-dom";

import { navigationLinks } from "../../config/navigation";
import { theme } from "../../styles/theme";

export function Sidebar() {
  return (
    <aside className={theme.nav.sidebar}>
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-app-text">Best Choice</h1>

        <p className={`text-sm ${theme.text.subtitle}`}>Faça seus palpites</p>
      </div>

      <nav className="flex flex-1 flex-col gap-2">
        {navigationLinks
          .filter((link) => link.showOnDesktop)
          .map(({ to, label, icon: Icon }) => (
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
    </aside>
  );
}
