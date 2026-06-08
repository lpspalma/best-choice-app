import { LogOut } from "lucide-react";

import { useAuth } from "../context/useAuth";
import { Button } from "../components/ui/Button";

export function Profile() {
  const { logout, user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-app-text">Perfil</h1>
        <p className="text-app-text-muted">{user?.email}</p>
      </div>

      <Button
        type="button"
        variant="ghost"
        onClick={logout}
        className="w-full justify-center text-app-danger hover:bg-app-danger-soft"
      >
        <LogOut size={18} />
        Sair
      </Button>
    </div>
  );
}
