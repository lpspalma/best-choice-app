import { Outlet } from "react-router-dom";

import { theme } from "../../styles/theme";
import { BottomNav } from "./BottomNav";
import { Sidebar } from "./Sidebar";

export function DashboardLayout() {
  return (
    <div className={theme.layout.appShell}>
      <div className="flex min-h-screen">
        <Sidebar />

        <main className={theme.layout.main}>
          <Outlet />
        </main>
      </div>

      <BottomNav />
    </div>
  );
}
