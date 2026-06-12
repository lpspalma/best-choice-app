import { useEffect, useState } from "react";

import { GameList } from "../components/game/GameList";
import { PageContainer } from "../components/layout/PageContainer";
import { EmptyState } from "../components/ui/EmptyState";
import { PageHeader } from "../components/ui/PageHeader";
import { getTodayWorldCupGames } from "../services/worldCupService";
import type { Game } from "../types/game";
import { getDateKey, getTodayKey } from "../utils/formatters/date";

export function TodayGames() {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadGames() {
      try {
        const data = await getTodayWorldCupGames();
        setGames(
          data.filter((game) => getDateKey(game.date) === getTodayKey()),
        );
      } catch {
        setError("Não foi possível carregar os jogos de hoje.");
      } finally {
        setIsLoading(false);
      }
    }

    loadGames();
  }, []);

  return (
    <PageContainer>
      <PageHeader
        title="Jogos de Hoje"
        description="Acompanhe os jogos de hoje da Copa."
      />

      <div className="space-y-4">
        {isLoading ? (
          <EmptyState
            title="Carregando jogos..."
            description="Buscando os jogos de hoje."
          />
        ) : error ? (
          <EmptyState title="Erro ao carregar jogos" description={error} />
        ) : (
          <GameList
            games={games}
            emptyTitle="Nenhum jogo hoje"
            emptyDescription="Volte mais tarde para acompanhar os próximos jogos."
          />
        )}
      </div>
    </PageContainer>
  );
}
