import type { Game } from "./game";

export type UserGuess = {
  id: string;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
  position: number;
  points: number;
  game: Game;
  homeGuess: number | null;
  awayGuess: number | null;
};
