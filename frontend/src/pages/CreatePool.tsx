import { PageHeader } from "../components/ui/PageHeader";
import { Card } from "../components/ui/Card";

export function CreatePool() {
  return (
    <>
      <PageHeader
        title="Create Pool"
        description="Create a new pool for users to join."
      />

      <Card>
        <p className="text-slate-400">Create pool form will be created here.</p>
      </Card>
    </>
  );
}
