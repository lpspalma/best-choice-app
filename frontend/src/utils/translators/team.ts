import { TEAM_NAMES_PT } from "../../constants/teams";

export function getTeamNamePt(name: string) {
  return TEAM_NAMES_PT[name] ?? name;
}
