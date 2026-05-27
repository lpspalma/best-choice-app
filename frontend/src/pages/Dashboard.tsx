import { useNavigate } from "react-router";
import { useAuth } from "../context/useAuth";
import { PageHeader } from "../components/ui/PageHeader";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

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
        <PageHeader title="Dashboard" description="Your betting overview" />
        <Card className="space-y-4">
          <Input placeholder="Search pools..." />
          <Button>Create pool</Button>
        </Card>
        <p className="text-slate-400">Welcome, {user?.name ?? user?.email}</p>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </main>
  );
}
