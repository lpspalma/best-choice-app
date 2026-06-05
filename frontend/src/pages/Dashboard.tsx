import { useNavigate } from "react-router-dom";

import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { PageHeader } from "../components/ui/PageHeader";
import { useAuth } from "../context/useAuth";
import { theme } from "../styles/theme";
import { PageContainer } from "../components/layout/PageContainer";

export function Dashboard() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <PageContainer>
      <PageHeader title="Dashboard" description="Your betting overview" />

      <Card className="space-y-4">
        <Input placeholder="Search pools..." />

        <div className="flex gap-3">
          <Button variant="primary">Create Pool</Button>
          <Button variant="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </Card>

      <Card variant="soft">
        <p className={theme.text.subtitle}>
          Welcome, {user?.name ?? user?.email}
        </p>
      </Card>
    </PageContainer>
  );
}
