import { theme } from "../../styles/theme";
import type { Game } from "../../types/game";
import { formatGameDate, formatGameTime } from "../../utils/formatters/date";
import { getRoundLabel } from "../../utils/translators/round";
import { Card } from "../ui/Card";
import { GameStatusBadge } from "./GameStatusBadge";
import { GameTeam } from "./GameTeam";

type GameCardProps = {
  game: Game;
};

export function GameCard({ game }: GameCardProps) {
  const shouldShowScore = game.status.short !== "NS";

  return (
    <Card className="space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-app-text">
            {formatGameDate(game.date)} às {formatGameTime(game.date)}
          </p>

          {game.venue && (
            <p className={`text-xs ${theme.text.subtle}`}>
              {game.venue.name} • {game.venue.city}
            </p>
          )}
        </div>

        <GameStatusBadge game={game} />
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <GameTeam name={game.teams.home.name} logo={game.teams.home.logo} />

        <div className="text-center">
          {shouldShowScore ? (
            <p className="text-xl font-bold text-app-text">
              {game.goals.home ?? 0} x {game.goals.away ?? 0}
            </p>
          ) : (
            <p className="text-sm font-semibold text-app-muted">VS</p>
          )}
        </div>

        <GameTeam
          name={game.teams.away.name}
          logo={game.teams.away.logo}
          alignRight
        />
      </div>

      <div className="flex flex-col gap-2 border-t border-app-border pt-4 md:flex-row md:items-center md:justify-between">
        <p className={`text-xs ${theme.text.subtle}`}>
          {getRoundLabel(game.league.round)}
        </p>

        <span
          className={
            game.canGuess
              ? "rounded-full bg-app-primary/15 px-3 py-1 text-xs font-semibold text-app-primary"
              : "rounded-full bg-app-surface px-3 py-1 text-xs font-semibold text-app-muted"
          }
        >
          {game.canGuess ? "Palpite disponível" : "Palpite bloqueado"}
        </span>
      </div>
    </Card>
  );
}
