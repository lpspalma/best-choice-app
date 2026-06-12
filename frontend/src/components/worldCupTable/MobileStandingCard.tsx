import { GameTeam } from "../game/GameTeam";

import type { TeamStanding } from "../../types/standing";

import { StatItem } from "./StatItem";
import { getTeamNamePt } from "../../utils/translators/team";
import { getStandingDescriptionLabel } from "../../utils/translators/standing";

type MobileStandingCardProps = {
  standing: TeamStanding;
};

export function MobileStandingCard({ standing }: MobileStandingCardProps) {
  const isQualified = standing.description?.includes("Qualification");

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
            name={getTeamNamePt(standing.team.name)}
            logo={standing.team.logo}
          />
        </div>

        <p className="text-xl font-bold text-app-gold">{standing.points}</p>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2 text-center text-xs">
        <StatItem label="J" value={standing.all?.played ?? 0} />
        <StatItem label="V" value={standing.all?.win ?? 0} />
        <StatItem label="E" value={standing.all?.draw ?? 0} />
        <StatItem label="D" value={standing.all?.lose ?? 0} />
        <StatItem label="GP" value={standing.all?.goals?.for ?? 0} />
        <StatItem label="GC" value={standing.all?.goals?.against ?? 0} />
        <StatItem label="SG" value={standing.goalsDiff ?? 0} />
        <StatItem label="PTS" value={standing.points} />
      </div>

      <div className="mt-4">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            isQualified
              ? "bg-app-primary/20 text-app-primary"
              : "bg-app-card-soft text-app-muted"
          }`}
        >
          {getStandingDescriptionLabel(standing.description)}
        </span>
      </div>
    </div>
  );
}
