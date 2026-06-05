import type { RankingUser } from "../types/ranking";

export const mockRanking: RankingUser[] = [
  {
    id: "user-1",
    position: 1,
    name: "Lucas",
    points: 24,
    exactScores: 5,
    correctResults: 8,
  },

  {
    id: "user-2",
    position: 2,
    name: "Maria",
    points: 21,
    exactScores: 4,
    correctResults: 7,
  },

  {
    id: "user-3",
    position: 3,
    name: "João",
    points: 18,
    exactScores: 3,
    correctResults: 6,
  },

  {
    id: "user-4",
    position: 4,
    name: "Ana",
    points: 16,
    exactScores: 2,
    correctResults: 5,
  },

  {
    id: "user-5",
    position: 5,
    name: "Carlos",
    points: 13,
    exactScores: 2,
    correctResults: 4,
  },
];
