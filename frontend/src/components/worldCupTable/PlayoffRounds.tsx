import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "../ui/Button";
import { Card } from "../ui/Card";

import type { Game } from "../../types/game";

import { theme } from "../../styles/theme";
import { PlayoffGameCard } from "./PlayoffGameCard";
import { translateRound } from "./worldCupTable.utils";

const roundOrder = [
  "Round of 32",
  "Round of 16",
  "Quarter-finals",
  "Semi-finals",
  "Final",
];

type PlayoffRoundsProps = {
  games: Game[];
  activeIndexes: Record<string, number>;
  onCarouselChange: (
    round: string,
    direction: "previous" | "next",
    gamesCount: number,
  ) => void;
};

export function PlayoffRounds({
  games,
  activeIndexes,
  onCarouselChange,
}: PlayoffRoundsProps) {
  return (
    <div className="space-y-6">
      {roundOrder.map((round) => {
        const roundGames = games.filter((game) => game.league.round === round);

        if (roundGames.length === 0) {
          return (
            <section key={round} className="space-y-3">
              <h2 className="text-lg font-bold text-app-text">
                {translateRound(round)}
              </h2>

              <Card>
                <p className={theme.text.muted}>
                  Confrontos ainda não definidos.
                </p>
              </Card>
            </section>
          );
        }

        const activeGameIndex = activeIndexes[round] ?? 0;
        const activeGame = roundGames[activeGameIndex];

        const canGoToPreviousGame = activeGameIndex > 0;
        const canGoToNextGame = activeGameIndex < roundGames.length - 1;

        return (
          <section key={round} className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <Button
                type="button"
                variant="secondary"
                onClick={() =>
                  onCarouselChange(round, "previous", roundGames.length)
                }
                disabled={!canGoToPreviousGame}
                className="flex items-center justify-center gap-2 px-3 md:px-4"
              >
                <ChevronLeft size={18} />
                <span className="hidden md:inline">Anterior</span>
              </Button>

              <div className="text-center">
                <h2 className="text-lg font-bold text-app-text">
                  {translateRound(round)}
                </h2>

                <p className={`text-xs ${theme.text.subtle}`}>
                  Jogo {activeGameIndex + 1} de {roundGames.length}
                </p>
              </div>

              <Button
                type="button"
                variant="secondary"
                onClick={() =>
                  onCarouselChange(round, "next", roundGames.length)
                }
                disabled={!canGoToNextGame}
                className="flex items-center justify-center gap-2 px-3 md:px-4"
              >
                <span className="hidden md:inline">Próximo</span>
                <ChevronRight size={18} />
              </Button>
            </div>

            <PlayoffGameCard game={activeGame} />
          </section>
        );
      })}
    </div>
  );
}
