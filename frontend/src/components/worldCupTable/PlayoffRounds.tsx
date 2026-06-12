import { ChevronLeft, ChevronRight } from "lucide-react";

import { theme } from "../../styles/theme";
import type { Game } from "../../types/game";
import { getRoundLabel } from "../../utils/translators/round";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { PlayoffGameCard } from "./PlayoffGameCard";

const roundOrder = [
  "Round of 32",
  "Round of 16",
  "Quarter-finals",
  "Semi-finals",
  "Final",
];

type PlayoffRoundsProps = {
  games: Game[];
  activeRoundIndex: number;
  onRoundChange: (roundIndex: number) => void;
};

export function PlayoffRounds({
  games,
  activeRoundIndex,
  onRoundChange,
}: PlayoffRoundsProps) {
  const activeRound = roundOrder[activeRoundIndex];
  const activeRoundGames = games.filter(
    (game) => game.league.round === activeRound,
  );

  const canGoToPreviousRound = activeRoundIndex > 0;
  const canGoToNextRound = activeRoundIndex < roundOrder.length - 1;

  function handlePreviousRound() {
    if (!canGoToPreviousRound) return;

    onRoundChange(activeRoundIndex - 1);
  }

  function handleNextRound() {
    if (!canGoToNextRound) return;

    onRoundChange(activeRoundIndex + 1);
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <Button
          type="button"
          variant="secondary"
          onClick={handlePreviousRound}
          disabled={!canGoToPreviousRound}
          className="flex items-center justify-center gap-2 px-3 md:px-4"
        >
          <ChevronLeft size={18} />
          <span className="hidden md:inline">Anterior</span>
        </Button>

        <div className="text-center">
          <h2 className="text-lg font-bold text-app-text">
            {getRoundLabel(activeRound)}
          </h2>

          <p className={`text-xs ${theme.text.subtle}`}>
            Fase {activeRoundIndex + 1} de {roundOrder.length}
          </p>
        </div>

        <Button
          type="button"
          variant="secondary"
          onClick={handleNextRound}
          disabled={!canGoToNextRound}
          className="flex items-center justify-center gap-2 px-3 md:px-4"
        >
          <span className="hidden md:inline">Próximo</span>
          <ChevronRight size={18} />
        </Button>
      </div>

      {activeRoundGames.length === 0 ? (
        <Card>
          <p className={theme.text.muted}>Confrontos ainda não definidos.</p>
        </Card>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {activeRoundGames.map((game) => (
            <PlayoffGameCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </section>
  );
}
