import type { FixtureStatus } from "../constants/gameStatus";
import type { GameTeam } from "./team";

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
    home: GameTeam;
    away: GameTeam;
  };

  goals: {
    home: number | null;
    away: number | null;
  };

  score?: GameScore;

  canGuess: boolean;
};
