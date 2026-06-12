import { API_URL } from "./api";
import type { Game } from "../types/game";

export async function getWorldCupGames(): Promise<Game[]> {
  const response = await fetch(`${API_URL}/world-cup/games`);

  if (!response.ok) {
    throw new Error("Failed to fetch World Cup games");
  }

  return response.json();
}

export async function getTodayWorldCupGames(): Promise<Game[]> {
  const response = await fetch(`${API_URL}/world-cup/games/today`);

  if (!response.ok) {
    throw new Error("Failed to fetch today World Cup games");
  }

  return response.json();
}

export async function getWorldCupGamesByDate(date: string): Promise<Game[]> {
  const response = await fetch(`${API_URL}/world-cup/games/date/${date}`);

  if (!response.ok) {
    throw new Error("Failed to fetch World Cup games by date");
  }

  return response.json();
}
