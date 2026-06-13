import { getTeamNamePt } from "../utils/team.utils";

export function mapTeam(team: {
  externalId: number;
  name: string;
  logo?: string | null;
}) {
  return {
    id: team.externalId,
    name: team.name,
    namePt: getTeamNamePt(team.externalId, team.name),
    logo: team.logo ?? undefined,
  };
}
