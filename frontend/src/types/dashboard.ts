import type { Game } from "./game";
import type { MyGuess } from "./myGuess";
import type { RankingUser } from "./ranking";

export type DashboardSummary = {
  points: number;
  currentPosition: number;
  totalPlayers: number;
  guessesMade: number;
  totalGames: number;
};

export type DashboardData = {
  summary: DashboardSummary;
  nextGames: Game[];
  latestGuesses: MyGuess[];
  quickRanking: RankingUser[];
};
