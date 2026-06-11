import { useState } from "react";

import { GameTeam } from "../components/game/GameTeam";
import { PageContainer } from "../components/layout/PageContainer";
import { Card } from "../components/ui/Card";
import { EmptyState } from "../components/ui/EmptyState";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { PageHeader } from "../components/ui/PageHeader";
import { mockResults } from "../mocks/results.mock";
import { theme } from "../styles/theme";
import type { Game } from "../types/game";
import { formatGameDateTime, formatShortDate } from "../utils/date";
import { translateRound, translateTeamName } from "../utils/worldCup";

export function Results() {
  const availableDates = getAvailableDates(mockResults);
  const defaultDate = getDefaultSelectedDate(availableDates);

  const [selectedDate, setSelectedDate] = useState(defaultDate);
  const [teamSearch, setTeamSearch] = useState("");

  const filteredResults = mockResults.filter((game) => {
    const matchesDate = getDateKey(game.date) === selectedDate;

    const translatedHomeTeam = translateTeamName(game.teams.home.name);
    const translatedAwayTeam = translateTeamName(game.teams.away.name);

    const matchesTeam =
      teamSearch.trim() === "" ||
      translatedHomeTeam.toLowerCase().includes(teamSearch.toLowerCase()) ||
      translatedAwayTeam.toLowerCase().includes(teamSearch.toLowerCase());

    return matchesDate && matchesTeam;
  });

  return (
    <PageContainer>
      <PageHeader
        title="Resultados"
        description="Veja os resultados dos jogos finalizados."
      />

      <DateFilter
        availableDates={availableDates}
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
      </div>

      <section className="space-y-4">
        {filteredResults.length === 0 ? (
          <EmptyState
            title="Nenhum resultado encontrado"
            description="Não encontramos jogos finalizados para esta data e seleção."
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

type DateFilterProps = {
  availableDates: string[];
  selectedDate: string;
  onSelectDate: (date: string) => void;
};

function DateFilter({
  availableDates,
  selectedDate,
  onSelectDate,
}: DateFilterProps) {
  return (
    <div className="-mx-1 mb-4 flex max-w-full gap-2 overflow-x-auto px-1 pb-1">
      {availableDates.map((date) => (
        <Button
          key={date}
          type="button"
          onClick={() => onSelectDate(date)}
          variant={selectedDate === date ? "primary" : "secondary"}
          className="shrink-0 rounded-full"
        >
          {formatShortDate(date)}
        </Button>
      ))}
    </div>
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
            {translateRound(game.league.round)}
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
            name={translateTeamName(game.teams.home.name)}
            logo={game.teams.home.logo}
          />
        </div>

        <div className="text-center">
          <p className="text-2xl font-bold text-app-text">
            {game.goals.home ?? 0} x {game.goals.away ?? 0}
          </p>

          <p className={theme.text.subtitle}>Placar final</p>
        </div>

        <div className={getWinnerClassName(game.teams.away.winner)}>
          <GameTeam
            name={translateTeamName(game.teams.away.name)}
            logo={game.teams.away.logo}
            alignRight
          />
        </div>
      </div>

      {(game.score?.extratime || game.score?.penalty) && (
        <div className="rounded-2xl bg-app-surface p-3 text-xs text-app-muted">
          {game.score.extratime && (
            <p>
              Prorrogação: {game.score.extratime.home ?? 0} x{" "}
              {game.score.extratime.away ?? 0}
            </p>
          )}

          {game.score.penalty && (
            <p>
              Pênaltis: {game.score.penalty.home ?? 0} x{" "}
              {game.score.penalty.away ?? 0}
            </p>
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
