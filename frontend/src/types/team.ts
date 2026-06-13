export type Team = {
  id: number;
  name: string;
  namePt?: string;
  logo?: string;
};

export type GameTeam = Team & {
  winner?: boolean | null;
};

export type StandingTeam = Team;
