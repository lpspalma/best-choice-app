import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";

export function DashboardLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex min-h-screen">
        {/* Sidebar will come next */}
        <Sidebar />

        <main className="flex-1 px-4 py-6 pb-24 md:px-8 md:pb-6">
          <Outlet />
        </main>
      </div>

      {/* BottomNav will come later */}
      <nav className="fixed bottom-0 left-0 right-0 border-t border-slate-800 bg-slate-950/95 p-3 md:hidden">
        <p className="text-center text-sm text-slate-400">Mobile navigation</p>
      </nav>
    </div>
  );
}
