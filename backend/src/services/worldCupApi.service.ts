import { footballDataApi } from "../lib/apiFootball";
import { mapFootballDataMatchToGame } from "../mappers/worldCup.mapper";
import { prisma } from "../lib/prisma";

export async function getWorldCupGamesFromDbService() {
  const games = await prisma.game.findMany({
    orderBy: {
      date: "asc",
    },
    include: {
      homeTeam: true,
      awayTeam: true,
    },
  });

  return games.map((game) => ({
    id: game.externalId,
    date: game.date.toISOString(),
    timestamp: game.timestamp,

    status: {
      long: game.statusLong,
      short: game.statusShort,
      elapsed: game.elapsed,
    },

    league: {
      round: game.round,
    },

    teams: {
      home: {
        id: game.homeTeam.externalId,
        name: game.homeTeam.name,
        logo: game.homeTeam.logo,
      },
      away: {
        id: game.awayTeam.externalId,
        name: game.awayTeam.name,
        logo: game.awayTeam.logo,
      },
    },

    goals: {
      home: game.homeGoals,
      away: game.awayGoals,
    },

    score: {
      halftime: {
        home: game.halfHome,
        away: game.halfAway,
      },
      fulltime: {
        home: game.fullHome,
        away: game.fullAway,
      },
    },

    canGuess: game.canGuess,
  }));
}

export async function getWorldCupMatchesService() {
  const response = await footballDataApi.get("/competitions/WC/matches");

  return response.data.matches.map(mapFootballDataMatchToGame);
}
