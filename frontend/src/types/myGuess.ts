import type { Game } from "./game";

export type MyGuess = {
  id: string;
  userId: string;
  game: Game;
  homeGuess: number | null;
  awayGuess: number | null;
  points: number | null;
  createdAt: string;
  updatedAt: string;
};
