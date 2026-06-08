import { GameList } from "../components/game/GameList";
import { PageContainer } from "../components/layout/PageContainer";
import { PageHeader } from "../components/ui/PageHeader";
import { mockTodayGames } from "../mocks/todayGames.mock";

export function TodayGames() {
  return (
    <PageContainer>
      <PageHeader
        title="Jogos de Hoje"
        description="Acompanhe os jogos de hoje da Copa."
      />

      <div className="space-y-4">
        <GameList
          games={mockTodayGames}
          emptyTitle="Nenhum jogo hoje"
          emptyDescription="Volte mais tarde para acompanhar os próximos jogos."
        />
      </div>
    </PageContainer>
  );
}
