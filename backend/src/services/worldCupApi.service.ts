import { footballDataApi } from "../lib/apiFootball";
import { mapFootballDataMatchToGame } from "../mappers/worldCup.mapper";
import { prisma } from "../lib/prisma";
import { getTeamNamePt } from "../utils/team.utils";
import { mapTeam } from "../mappers/team.mapper";
import { mapDbStandingToResponse } from "../mappers/standing.mapper";

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

  return games.map(mapDbGameToGame);
}

export async function getWorldCupMatchesService() {
  const response = await footballDataApi.get("/competitions/WC/matches");

  return response.data.matches.map(mapFootballDataMatchToGame);
}

function mapDbGameToGame(game: any) {
  return {
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
      home: mapTeam(game.homeTeam),
      away: mapTeam(game.awayTeam),
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
  };
}

export async function getWorldCupGamesByDateService(date: string) {
  const startDate = new Date(`${date}T00:00:00-03:00`);
  const endDate = new Date(`${date}T23:59:59.999-03:00`);

  const games = await prisma.game.findMany({
    where: {
      date: {
        gte: startDate,
        lte: endDate,
      },
    },
    orderBy: {
      date: "asc",
    },
    include: {
      homeTeam: true,
      awayTeam: true,
    },
  });

  return games.map(mapDbGameToGame);
}

export async function getWorldCupGameDatesService() {
  const games = await prisma.game.findMany({
    select: {
      date: true,
    },
    orderBy: {
      date: "asc",
    },
  });

  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
  });

  const dates = games.map((game) => formatter.format(game.date));

  return Array.from(new Set(dates));
}

export async function getWorldCupTeamsService() {
  const teams = await prisma.team.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return teams.map(mapTeam);
}

export async function getWorldCupStandingsService() {
  const standings = await prisma.standing.findMany({
    orderBy: [
      {
        group: "asc",
      },
      {
        rank: "asc",
      },
    ],
    include: {
      team: true,
    },
  });

  const groupedStandings = standings.reduce<Record<string, any[]>>(
    (groups, standing) => {
      if (!groups[standing.group]) {
        groups[standing.group] = [];
      }

      groups[standing.group].push(mapDbStandingToResponse(standing));

      return groups;
    },
    {},
  );

  return Object.values(groupedStandings);
}
