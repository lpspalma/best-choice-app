import { TEAM_NAME_TRANSLATIONS_PT } from "../constants/teamNameTranslations";

export function getTeamNamePt(teamId: number, fallbackName: string) {
  return TEAM_NAME_TRANSLATIONS_PT[teamId] ?? fallbackName;
}
