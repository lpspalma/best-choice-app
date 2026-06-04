import { PageContainer } from "../components/layout/PageContainer";
import { Card } from "../components/ui/Card";
import { PageHeader } from "../components/ui/PageHeader";

export function Profile() {
  return (
    <PageContainer>
      <PageHeader
        title="Profile"
        description="Manage your account information."
      />

      <Card>
        <p className="text-slate-400">Profile content will be created here.</p>
      </Card>
    </PageContainer>
  );
}
