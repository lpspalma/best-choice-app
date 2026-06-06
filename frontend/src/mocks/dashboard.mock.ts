import type { DashboardData } from "../types/dashboard";
import { mockMyGuesses } from "./myGuesses.mock";
import { mockRanking } from "./ranking.mock";
import { mockTodayGames } from "./todayGames.mock";

export const mockDashboardData: DashboardData = {
  summary: {
    points: 120,
    currentPosition: 8,
    totalPlayers: 120,
    guessesMade: 32,
    totalGames: 64,
  },

  nextGames: mockTodayGames.slice(0, 4),

  latestGuesses: mockMyGuesses.slice(0, 3),

  quickRanking: mockRanking.slice(0, 5),
};
