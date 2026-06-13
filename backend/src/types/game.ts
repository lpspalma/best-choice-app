export type Team = {
  id: number;
  name: string;
  namePt: string;
  logo?: string;
  winner?: boolean | null;
};

export type FixtureStatus = "NS" | "1H" | "HT" | "2H" | "ET" | "P" | "FT";

export type GameScore = {
  halftime?: {
    home: number | null;
    away: number | null;
  };
  fulltime?: {
    home: number | null;
    away: number | null;
  };
  extratime?: {
    home: number | null;
    away: number | null;
  };
  penalty?: {
    home: number | null;
    away: number | null;
  };
};

export type Game = {
  id: number;
  date: string;
  timestamp: number;

  venue?: {
    id: number | null;
    name: string;
    city: string;
  };

  status: {
    long: string;
    short: FixtureStatus;
    elapsed: number | null;
  };

  league: {
    round: string;
  };

  teams: {
    home: Team;
    away: Team;
  };

  goals: {
    home: number | null;
    away: number | null;
  };

  score?: GameScore;

  canGuess: boolean;
};
