import { GameTeam } from "../game/GameTeam";
import { Card } from "../ui/Card";
import type { Game } from "../../types/game";
import { formatGameDate } from "../../utils/formatters/date";
import { getTeamNamePt } from "../../utils/translators/team";
import { getRoundLabel } from "../../utils/translators/round";
import {
  getGameStatusClassName,
  getGameStatusLabel,
} from "../../utils/translators/gameStatus";

type PlayoffGameCardProps = {
  game: Game;
};

export function PlayoffGameCard({ game }: PlayoffGameCardProps) {
  const shouldShowScore = game.status.short !== "NS";

  const hasPenalty =
    game.score?.penalty?.home !== null &&
    game.score?.penalty?.home !== undefined &&
    game.score?.penalty?.away !== null &&
    game.score?.penalty?.away !== undefined;

  return (
    <Card className="space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-app-text">
            {getRoundLabel(game.league.round)}
          </p>

          <p className="text-xs text-app-subtle">{formatGameDate(game.date)}</p>

          <p className="text-xs text-app-subtle">
            {game.venue.name} • {game.venue.city}
          </p>
        </div>

        <span className={getGameStatusClassName(game.status.short)}>
          {getGameStatusLabel(game)}
        </span>
      </div>

      <div className="space-y-3">
        <PlayoffTeamRow
          name={getTeamNamePt(game.teams.home.name)}
          logo={game.teams.home.logo}
          score={game.goals.home}
          penaltyScore={game.score?.penalty?.home}
          winner={game.teams.home.winner}
          shouldShowScore={shouldShowScore}
          hasPenalty={hasPenalty}
        />

        <PlayoffTeamRow
          name={getTeamNamePt(game.teams.away.name)}
          logo={game.teams.away.logo}
          score={game.goals.away}
          penaltyScore={game.score?.penalty?.away}
          winner={game.teams.away.winner}
          shouldShowScore={shouldShowScore}
          hasPenalty={hasPenalty}
        />
      </div>

      {!shouldShowScore && (
        <p className="rounded-xl bg-app-card-soft px-3 py-2 text-center text-xs font-semibold text-app-muted">
          Confronto ainda não iniciado
        </p>
      )}
    </Card>
  );
}

type PlayoffTeamRowProps = {
  name: string;
  logo?: string;
  score: number | null;
  penaltyScore?: number | null;
  winner?: boolean | null;
  shouldShowScore: boolean;
  hasPenalty: boolean;
};

function PlayoffTeamRow({
  name,
  logo,
  score,
  penaltyScore,
  winner,
  shouldShowScore,
  hasPenalty,
}: PlayoffTeamRowProps) {
  return (
    <div
      className={`flex items-center justify-between gap-3 rounded-xl border p-3 ${
        winner
          ? "border-app-primary bg-app-primary/10"
          : "border-app-border bg-app-surface"
      }`}
    >
      <GameTeam name={name} logo={logo} />

      <div className="flex items-center gap-2">
        {shouldShowScore ? (
          <span className="text-lg font-bold text-app-text">{score ?? 0}</span>
        ) : (
          <span className="text-sm font-semibold text-app-muted">-</span>
        )}

        {hasPenalty && (
          <span className="text-xs font-semibold text-app-gold">
            ({penaltyScore ?? 0})
          </span>
        )}
      </div>
    </div>
  );
}
