import { footballDataApi } from "../lib/apiFootball";
import { mapFootballDataMatchToGame } from "../mappers/worldCup.mapper";

export async function getWorldCupMatchesService() {
  const response = await footballDataApi.get("/competitions/WC/matches");

  return response.data.matches.map(mapFootballDataMatchToGame);
}
