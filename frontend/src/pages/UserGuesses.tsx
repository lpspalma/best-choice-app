import { PageContainer } from "../components/layout/PageContainer";
import { UserGuessesList } from "../components/guesses/UserGuessesList";
import { PageHeader } from "../components/ui/PageHeader";

export function UserGuesses() {
  return (
    <PageContainer>
      <PageHeader
        title="Palpites dos Usuários"
        description="Veja os palpites dos outros participantes."
      />

      <UserGuessesList />
    </PageContainer>
  );
}
