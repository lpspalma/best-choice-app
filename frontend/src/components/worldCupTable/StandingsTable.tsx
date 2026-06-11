import { GameTeam } from "../game/GameTeam";

import type { StandingGroup } from "../../types/standing";

import { theme } from "../../styles/theme";
import { translateStandingDescription } from "./worldCupTable.utils";
import { getTeamNamePt } from "../../utils/translators/team";

type StandingsTableProps = {
  group: StandingGroup;
};

export function StandingsTable({ group }: StandingsTableProps) {
  return (
    <div className="hidden md:block">
      <table className="w-full text-sm">
        <thead>
          <tr className={`border-b border-app-border ${theme.text.subtle}`}>
            <th className="py-3 text-left font-semibold">#</th>
            <th className="py-3 text-left font-semibold">Seleção</th>
            <th className="py-3 text-center font-semibold">J</th>
            <th className="py-3 text-center font-semibold">V</th>
            <th className="py-3 text-center font-semibold">E</th>
            <th className="py-3 text-center font-semibold">D</th>
            <th className="py-3 text-center font-semibold">GP</th>
            <th className="py-3 text-center font-semibold">GC</th>
            <th className="py-3 text-center font-semibold">SG</th>
            <th className="py-3 text-center font-semibold">PTS</th>
            <th className="py-3 text-left font-semibold">Status</th>
          </tr>
        </thead>

        <tbody>
          {group.map((standing) => {
            const isQualified = standing.description?.includes("Qualification");

            return (
              <tr
                key={standing.team.id}
                className={`border-b border-app-border last:border-b-0 ${
                  isQualified
                    ? "border-l-4 border-app-primary bg-app-primary/10"
                    : ""
                }`}
              >
                <td className="py-4 font-bold text-app-text">
                  {standing.rank}
                </td>

                <td className="py-4">
                  <GameTeam
                    name={getTeamNamePt(standing.team.name)}
                    logo={standing.team.logo}
                  />
                </td>

                <td className="py-4 text-center text-app-text">
                  {standing.all?.played ?? 0}
                </td>

                <td className="py-4 text-center text-app-text">
                  {standing.all?.win ?? 0}
                </td>

                <td className="py-4 text-center text-app-text">
                  {standing.all?.draw ?? 0}
                </td>

                <td className="py-4 text-center text-app-text">
                  {standing.all?.lose ?? 0}
                </td>

                <td className="py-4 text-center text-app-text">
                  {standing.all?.goals?.for ?? 0}
                </td>

                <td className="py-4 text-center text-app-text">
                  {standing.all?.goals?.against ?? 0}
                </td>

                <td className="py-4 text-center text-app-text">
                  {standing.goalsDiff ?? 0}
                </td>

                <td className="py-4 text-center font-bold text-app-gold">
                  {standing.points}
                </td>

                <td className="py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      isQualified
                        ? "bg-app-primary/20 text-app-primary"
                        : "bg-app-card-soft text-app-muted"
                    }`}
                  >
                    {translateStandingDescription(standing.description)}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
