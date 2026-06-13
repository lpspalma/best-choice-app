import { API_URL } from "./api";
import type { Game } from "../types/game";
import type { StandingGroup } from "../types/standing";

export async function getWorldCupGames(): Promise<Game[]> {
  const response = await fetch(`${API_URL}/world-cup/games`);

  if (!response.ok) {
    throw new Error("Failed to fetch World Cup games");
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

export async function getWorldCupGameDates(): Promise<string[]> {
  const response = await fetch(`${API_URL}/world-cup/games/dates`);

  if (!response.ok) {
    throw new Error("Failed to fetch World Cup game dates");
  }

  return response.json();
}

export async function getWorldCupStandings(): Promise<StandingGroup[]> {
  const response = await fetch(`${API_URL}/world-cup/standings`);

  if (!response.ok) {
    throw new Error("Failed to fetch World Cup standings");
  }

  return response.json();
}
