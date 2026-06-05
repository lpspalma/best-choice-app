export type StandingTeam = {
  id: number;
  name: string;
  logo?: string;
};

export type TeamStanding = {
  rank: number;
  team: StandingTeam;
  points: number;
  goalsDiff?: number;
  group: string;
  form?: string;
  status?: string;
  description?: string;
  all?: {
    played?: number;
    win?: number;
    draw?: number;
    lose?: number;
    goals?: {
      for?: number;
      against?: number;
    };
  };
};

export type StandingGroup = TeamStanding[];
