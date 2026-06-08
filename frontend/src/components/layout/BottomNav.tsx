import { NavLink } from "react-router-dom";

import { navigationLinks } from "../../config/navigation";
import { theme } from "../../styles/theme";

export function BottomNav() {
  const mobileLinks = navigationLinks.filter((link) => link.showOnMobile);

  return (
    <nav className={theme.nav.bottom}>
      <div
        className="grid gap-1"
        style={{
          gridTemplateColumns: `repeat(${mobileLinks.length}, minmax(0, 1fr))`,
        }}
      >
        {mobileLinks.map(({ to, label, mobileLabel, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `
                ${theme.nav.bottomItem}
                ${isActive ? theme.nav.navItemActive : theme.nav.navItemInactive}
              `
            }
          >
            <Icon size={20} />

            <span>{mobileLabel ?? label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
