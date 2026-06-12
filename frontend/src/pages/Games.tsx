import { useEffect, useState } from "react";

import { GameList } from "../components/game/GameList";
import { PageContainer } from "../components/layout/PageContainer";
import { Button } from "../components/ui/Button";
import { EmptyState } from "../components/ui/EmptyState";
import { PageHeader } from "../components/ui/PageHeader";
import { getWorldCupGames } from "../services/worldCupService";
import type { Game } from "../types/game";
import { getDateKey, getTodayKey } from "../utils/formatters/date";

type GamesTab = "today-games" | "all-games";

export function Games() {
  const [activeTab, setActiveTab] = useState<GamesTab>("today-games");
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadGames() {
      try {
        const data = await getWorldCupGames();
        setGames(data);
      } catch {
        setError("Não foi possível carregar os jogos.");
      } finally {
        setIsLoading(false);
      }
    }

    loadGames();
  }, []);

  const todayGames = games.filter(
    (game) => getDateKey(game.date) === getTodayKey(),
  );

  if (isLoading) {
    return (
      <PageContainer>
        <PageHeader
          title="Jogos"
          description="Acompanhe os jogos do dia e todos os jogos da Copa."
        />

        <EmptyState
          title="Carregando jogos..."
          description="Buscando os jogos disponíveis."
        />
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <PageHeader
          title="Jogos"
          description="Acompanhe os jogos do dia e todos os jogos da Copa."
        />

        <EmptyState title="Erro ao carregar jogos" description={error} />
      </PageContainer>
    );
  }

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
          games={todayGames}
          emptyTitle="Nenhum jogo hoje"
          emptyDescription="Volte mais tarde para acompanhar os próximos jogos."
        />
      </section>

      <section
        className={activeTab === "all-games" ? "space-y-4" : "hidden md:block"}
      >
        <GameList
          games={games}
          emptyTitle="Nenhum jogo encontrado"
          emptyDescription="Assim que os jogos estiverem disponíveis, eles aparecerão aqui."
        />
      </section>
    </PageContainer>
  );
}
