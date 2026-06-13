import type { StandingTeam } from "./team";

export type TeamStanding = {
  rank: number;
  team: StandingTeam;
  points: number;
  goalsDiff: number;
  group: string;
  played: number;
  win: number;
  draw: number;
  lose: number;
  goalsFor: number;
  goalsAgainst: number;
};

export type StandingGroup = TeamStanding[];
