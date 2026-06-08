import { useState } from "react";
import { PageContainer } from "../components/layout/PageContainer";
import { PageHeader } from "../components/ui/PageHeader";
import { mockGames } from "../mocks/games.mock";
import { mockTodayGames } from "../mocks/todayGames.mock";
import { Button } from "../components/ui/Button";
import { GameList } from "../components/game/GameList";

type GamesTab = "today-games" | "all-games";

export function Games() {
  const [activeTab, setActiveTab] = useState<GamesTab>("today-games");

  return (
    <PageContainer>
      <PageHeader
        title="Jogos"
        description="Acompanhe os jogos do dia e todos os jogos da Copa."
      />

      <div className="mb-4 grid grid-cols-2 gap-2 md:hidden">
        <Button
          type="button"
          onClick={() => setActiveTab("today-games")}
          variant={activeTab === "today-games" ? "primary" : "secondary"}
        >
          Jogos de Hoje
        </Button>

        <Button
          type="button"
          onClick={() => setActiveTab("all-games")}
          variant={activeTab === "all-games" ? "primary" : "secondary"}
        >
          Todos os Jogos
        </Button>
      </div>

      <section
        className={
          activeTab === "today-games" ? "space-y-4" : "hidden md:hidden"
        }
      >
        <GameList
          games={mockTodayGames}
          emptyTitle="Nenhum jogo hoje"
          emptyDescription="Volte mais tarde para acompanhar os próximos jogos."
        />
      </section>

      <section
        className={activeTab === "all-games" ? "space-y-4" : "hidden md:block"}
      >
        <GameList
          games={mockGames}
          emptyTitle="Nenhum jogo encontrado"
          emptyDescription="Assim que os jogos estiverem disponíveis, eles aparecerão aqui."
        />
      </section>
    </PageContainer>
  );
}
