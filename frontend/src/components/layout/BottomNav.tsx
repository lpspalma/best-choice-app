import { NavLink } from "react-router-dom";

import { navigationLinks } from "../../config/navigation";
import { theme } from "../../styles/theme";
import { LogOut } from "lucide-react";
import { useAuth } from "../../context/useAuth";
import { Button } from "../ui/Button";

export function BottomNav() {
  const { logout } = useAuth();
  return (
    <nav className={theme.nav.bottom}>
      <div className="grid grid-cols-6 gap-1">
        {navigationLinks
          .filter((link) => link.showOnMobile)
          .map(({ to, label, mobileLabel, icon: Icon }) => (
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

              <span>{mobileLabel ?? label}</span>
            </NavLink>
          ))}
        <Button
          type="button"
          variant="ghost"
          onClick={logout}
          className={`
            ${theme.nav.bottomItem}
            rounded-lg! px-1! py-1.5! text-[10px]! font-normal!
            hover:bg-app-danger-soft! hover:text-app-danger!
          `}
        >
          <LogOut size={18} />
          <span>Sair</span>
        </Button>
      </div>
    </nav>
  );
}
