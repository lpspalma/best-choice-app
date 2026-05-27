import { useNavigate } from "react-router";
import { useAuth } from "../context/useAuth";

export function Dashboard() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <main className="min-h-screen p-6 text-slate-100">
      <div className="rounded-2xl border border-cyan-400/30 bg-slate-900/70 p-6">
        <h1 className="text-2xl font-bold text-cyan-300">Dashboard</h1>
        <p className="text-slate-400">Dark/neon theme is working.</p>
        <p>Welcome, {user?.name ?? user?.email}</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </main>
  );
}
