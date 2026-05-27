import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { BottomNav } from "../components/layout/BottomNav";

export function DashboardLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex min-h-screen">
        <Sidebar />

        <main className="flex-1 px-4 py-6 pb-24 md:px-8 md:pb-6">
          <Outlet />
        </main>
      </div>

      <BottomNav />
    </div>
  );
}
