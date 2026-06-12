import { useEffect, useState } from "react";

import { GameList } from "../components/game/GameList";
import { PageContainer } from "../components/layout/PageContainer";
import { DateTabs } from "../components/ui/DateTabs";
import { EmptyState } from "../components/ui/EmptyState";
import { PageHeader } from "../components/ui/PageHeader";
import {
  getWorldCupGameDates,
  getWorldCupGamesByDate,
} from "../services/worldCupService";
import type { Game } from "../types/game";
import { formatShortDate } from "../utils/formatters/date";

export function Games() {
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [games, setGames] = useState<Game[]>([]);

  const [isLoadingDates, setIsLoadingDates] = useState(true);
  const [isLoadingGames, setIsLoadingGames] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDates() {
      try {
        const dates = await getWorldCupGameDates();
        const defaultDate = getDefaultSelectedDate(dates);

        setAvailableDates(dates);
        setSelectedDate(defaultDate);
      } catch {
        setError("Não foi possível carregar as datas dos jogos.");
      } finally {
        setIsLoadingDates(false);
      }
    }

    loadDates();
  }, []);

  useEffect(() => {
    if (!selectedDate) {
      return;
    }

    async function loadGamesByDate() {
      try {
        setIsLoadingGames(true);
        setError("");

        const data = await getWorldCupGamesByDate(selectedDate);
        setGames(data);
      } catch {
        setError("Não foi possível carregar os jogos desta data.");
      } finally {
        setIsLoadingGames(false);
      }
    }

    loadGamesByDate();
  }, [selectedDate]);

  return (
    <PageContainer>
      <PageHeader
        title="Jogos"
        description="Acompanhe os jogos da Copa por data."
      />

      {isLoadingDates ? (
        <EmptyState
          title="Carregando datas..."
          description="Buscando os dias com jogos disponíveis."
        />
      ) : error ? (
        <EmptyState title="Erro ao carregar jogos" description={error} />
      ) : availableDates.length === 0 ? (
        <EmptyState
          title="Nenhuma data encontrada"
          description="Assim que os jogos estiverem disponíveis, as datas aparecerão aqui."
        />
      ) : (
        <>
          <DateTabs
            dates={availableDates}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />
          <p className="mb-4 text-sm font-medium text-app-muted">
            Jogos de {formatShortDate(selectedDate)}
          </p>

          <section
            className={`space-y-4 transition-opacity duration-300 ${
              isLoadingGames ? "opacity-50" : "opacity-100"
            }`}
          >
            <GameList
              games={games}
              emptyTitle={
                isLoadingGames
                  ? "Carregando jogos..."
                  : "Nenhum jogo encontrado"
              }
              emptyDescription={
                isLoadingGames
                  ? "Buscando os jogos da data selecionada."
                  : "Não encontramos jogos para esta data."
              }
            />
          </section>
        </>
      )}
    </PageContainer>
  );
}

function getDefaultSelectedDate(dates: string[]) {
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
  }).format(new Date());

  if (dates.includes(today)) {
    return today;
  }

  const futureDates = dates.filter((date) => date > today);

  if (futureDates.length > 0) {
    return futureDates[0];
  }

  return dates[dates.length - 1] ?? "";
}
