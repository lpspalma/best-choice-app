import { theme } from "../../styles/theme";
import type { Game } from "../../types/game";
import { formatGameDateTime } from "../../utils/formatters/date";
import { getRoundLabel } from "../../utils/translators/round";
import { Card } from "../ui/Card";
import { GameTeam } from "./GameTeam";

type ResultGameCardProps = {
  game: Game;
};

export function ResultGameCard({ game }: ResultGameCardProps) {
  return (
    <Card className="space-y-4">
      <div className="flex flex-col gap-1 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm font-semibold text-app-primary">
            {getRoundLabel(game.league.round)}
          </p>

          <p className={theme.text.subtitle}>
            {formatGameDateTime(game.date)}
            {game.venue && ` • ${game.venue.name}, ${game.venue.city}`}
          </p>
        </div>

        <span className="w-fit rounded-full bg-app-primary/15 px-3 py-1 text-xs font-semibold text-app-primary">
          Finalizado
        </span>
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <div className={getWinnerClassName(game.teams.home.winner)}>
          <GameTeam
            name={game.teams.home.namePt ?? game.teams.home.name}
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
            name={game.teams.away.namePt ?? game.teams.away.name}
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

function getWinnerClassName(winner?: boolean | null) {
  return winner
    ? "rounded-2xl bg-app-primary/10 p-2 ring-1 ring-app-primary/30"
    : "p-2";
}
