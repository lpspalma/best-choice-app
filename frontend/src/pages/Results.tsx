import { useState } from "react";

import { GameTeam } from "../components/game/GameTeam";
import { PageContainer } from "../components/layout/PageContainer";
import { Card } from "../components/ui/Card";
import { EmptyState } from "../components/ui/EmptyState";
import { Input } from "../components/ui/Input";
import { PageHeader } from "../components/ui/PageHeader";
import { mockResults } from "../mocks/results.mock";
import { theme } from "../styles/theme";
import type { Game } from "../types/game";
import { formatGameDateTime } from "../utils/formatters/date";
import { DateTabs } from "../components/ui/DateTabs";
import { getTeamNamePt } from "../utils/translators/team";
import { getRoundLabel } from "../utils/translators/round";

export function Results() {
  const availableDates = getAvailableDates(mockResults);
  const defaultDate = getDefaultSelectedDate(availableDates);

  const [selectedDate, setSelectedDate] = useState(defaultDate);
  const [teamSearch, setTeamSearch] = useState("");

  const filteredResults = mockResults
    .filter((game) => {
      const translatedHomeTeam = getTeamNamePt(game.teams.home.name);
      const translatedAwayTeam = getTeamNamePt(game.teams.away.name);

      const normalizedSearch = normalizeText(teamSearch.trim());

      const matchesTeam =
        normalizedSearch === "" ||
        normalizeText(translatedHomeTeam).includes(normalizedSearch) ||
        normalizeText(translatedAwayTeam).includes(normalizedSearch);

      if (normalizedSearch !== "") {
        return matchesTeam;
      }

      return getDateKey(game.date) === selectedDate;
    })
    .sort((a, b) => b.timestamp - a.timestamp);

  return (
    <PageContainer>
      <PageHeader
        title="Resultados"
        description="Veja os resultados dos jogos finalizados."
      />

      <DateTabs
        dates={availableDates}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
      />

      <div className="mb-4">
        <Input
          type="text"
          placeholder="Buscar por seleção..."
          value={teamSearch}
          onChange={(event) => setTeamSearch(event.target.value)}
        />

        {teamSearch.trim() !== "" && (
          <p className={`mt-2 text-xs ${theme.text.subtle}`}>
            Exibindo todos os resultados encontrados para esta seleção.
          </p>
        )}
      </div>

      <section className="space-y-4">
        {filteredResults.length === 0 ? (
          <EmptyState
            title="Nenhum resultado encontrado"
            description="Não encontramos jogos finalizados para esta busca."
          />
        ) : (
          filteredResults.map((game) => (
            <ResultCard key={game.id} game={game} />
          ))
        )}
      </section>
    </PageContainer>
  );
}

type ResultCardProps = {
  game: Game;
};

function ResultCard({ game }: ResultCardProps) {
  return (
    <Card className="space-y-4">
      <div className="flex flex-col gap-1 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm font-semibold text-app-primary">
            {getRoundLabel(game.league.round)}
          </p>

          <p className={theme.text.subtitle}>
            {formatGameDateTime(game.date)} • {game.venue.name},{" "}
            {game.venue.city}
          </p>
        </div>

        <span className="w-fit rounded-full bg-app-primary/15 px-3 py-1 text-xs font-semibold text-app-primary">
          Finalizado
        </span>
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <div className={getWinnerClassName(game.teams.home.winner)}>
          <GameTeam
            name={getTeamNamePt(game.teams.home.name)}
            logo={game.teams.home.logo}
          />

          {game.teams.home.winner && (
            <p className="mt-2 text-xs font-semibold text-app-primary">
              Vencedor
            </p>
          )}
        </div>

        <div className="text-center">
          <p className="text-2xl font-bold text-app-text">
            {game.goals.home ?? 0} x {game.goals.away ?? 0}
          </p>

          <p className={theme.text.subtitle}>Placar final</p>
        </div>

        <div className={getWinnerClassName(game.teams.away.winner)}>
          <GameTeam
            name={getTeamNamePt(game.teams.away.name)}
            logo={game.teams.away.logo}
            alignRight
          />

          {game.teams.away.winner && (
            <p className="mt-2 text-right text-xs font-semibold text-app-primary">
              Vencedor
            </p>
          )}
        </div>
      </div>

      {(game.score?.extratime || game.score?.penalty) && (
        <div className="grid gap-2 rounded-2xl bg-app-surface p-3 text-xs text-app-muted md:grid-cols-2">
          {game.score.extratime && (
            <div>
              <p className="font-semibold text-app-text">Prorrogação</p>
              <p>
                {game.score.extratime.home ?? 0} x{" "}
                {game.score.extratime.away ?? 0}
              </p>
            </div>
          )}

          {game.score.penalty && (
            <div>
              <p className="font-semibold text-app-text">Pênaltis</p>
              <p>
                {game.score.penalty.home ?? 0} x {game.score.penalty.away ?? 0}
              </p>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}

function getAvailableDates(games: Game[]) {
  return Array.from(new Set(games.map((game) => getDateKey(game.date)))).sort();
}

function getDefaultSelectedDate(availableDates: string[]) {
  const today = new Date().toISOString().slice(0, 10);

  if (availableDates.includes(today)) {
    return today;
  }

  const pastOrTodayDates = availableDates.filter((date) => date <= today);

  if (pastOrTodayDates.length > 0) {
    return pastOrTodayDates[pastOrTodayDates.length - 1];
  }

  return availableDates[0] ?? "";
}

function getDateKey(date: string) {
  return date.slice(0, 10);
}

function getWinnerClassName(winner?: boolean | null) {
  return winner
    ? "rounded-2xl bg-app-primary/10 p-2 ring-1 ring-app-primary/30"
    : "p-2";
}

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}
