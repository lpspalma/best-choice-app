import { GameTeam } from "../game/GameTeam";

import type { TeamStanding } from "../../types/standing";

import { StatItem } from "./StatItem";

type MobileStandingCardProps = {
  standing: TeamStanding;
};

export function MobileStandingCard({ standing }: MobileStandingCardProps) {
  const isQualified = standing.rank <= 2;

  return (
    <div
      className={`rounded-2xl border p-4 ${
        isQualified
          ? "border-app-primary bg-app-primary/10"
          : "border-app-border bg-app-surface"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold text-app-text">
            {standing.rank}
          </span>

          <GameTeam
            name={standing.team.namePt ?? standing.team.name}
            logo={standing.team.logo}
          />
        </div>

        <p className="text-xl font-bold text-app-gold">{standing.points}</p>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2 text-center text-xs">
        <StatItem label="J" value={standing.played} />
        <StatItem label="V" value={standing.win} />
        <StatItem label="E" value={standing.draw} />
        <StatItem label="D" value={standing.lose} />
        <StatItem label="GP" value={standing.goalsFor} />
        <StatItem label="GC" value={standing.goalsAgainst} />
        <StatItem label="SG" value={standing.goalsDiff} />
        <StatItem label="PTS" value={standing.points} />
      </div>
    </div>
  );
}
