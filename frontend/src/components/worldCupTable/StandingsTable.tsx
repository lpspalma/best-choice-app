import { GameTeam } from "../game/GameTeam";

import type { StandingGroup } from "../../types/standing";

import { theme } from "../../styles/theme";

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
          </tr>
        </thead>

        <tbody>
          {group.map((standing) => {
            const isQualified = standing.rank <= 2;

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
                    name={standing.team.namePt ?? standing.team.name}
                    logo={standing.team.logo}
                  />
                </td>

                <td className="py-4 text-center text-app-text">
                  {standing.played}
                </td>

                <td className="py-4 text-center text-app-text">
                  {standing.win}
                </td>

                <td className="py-4 text-center text-app-text">
                  {standing.draw}
                </td>

                <td className="py-4 text-center text-app-text">
                  {standing.lose}
                </td>

                <td className="py-4 text-center text-app-text">
                  {standing.goalsFor}
                </td>

                <td className="py-4 text-center text-app-text">
                  {standing.goalsAgainst}
                </td>

                <td className="py-4 text-center text-app-text">
                  {standing.goalsDiff}
                </td>

                <td className="py-4 text-center font-bold text-app-gold">
                  {standing.points}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
