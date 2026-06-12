import { API_URL } from "./api";
import type { Game } from "../types/game";

export async function getWorldCupGames(): Promise<Game[]> {
  const response = await fetch(`${API_URL}/world-cup/games`);

  if (!response.ok) {
    throw new Error("Failed to fetch World Cup games");
  }

  return response.json();
}
