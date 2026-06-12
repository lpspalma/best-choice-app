import { footballDataApi } from "../lib/apiFootball";
import { prisma } from "../lib/prisma";

type FootballDataMatch = {
  id: number;
  utcDate: string;
  status: string;
  matchday: number | null;
  stage: string | null;
  homeTeam: {
    id: number | null;
    name: string | null;
    crest: string | null;
  } | null;
  awayTeam: {
    id: number | null;
    name: string | null;
    crest: string | null;
  } | null;
  score: {
    fullTime: {
      home: number | null;
      away: number | null;
    };
    halfTime: {
      home: number | null;
      away: number | null;
    };
  };
};

function formatRound(match: FootballDataMatch) {
  if (match.stage === "GROUP_STAGE") {
    return `Group Stage - Round ${match.matchday ?? ""}`.trim();
  }

  return match.stage?.replace(/_/g, " ") ?? "World Cup";
}

export async function syncWorldCupMatchesService() {
  const response = await footballDataApi.get("/competitions/WC/matches");

  const matches: FootballDataMatch[] = response.data.matches;

  let syncedMatches = 0;
  let skippedMatches = 0;

  for (const match of matches) {
    if (
      !match.homeTeam?.id ||
      !match.homeTeam.name ||
      !match.awayTeam?.id ||
      !match.awayTeam.name
    ) {
      skippedMatches++;
      continue;
    }

    const homeTeam = await prisma.team.upsert({
      where: {
        externalId: match.homeTeam.id,
      },
      update: {
        name: match.homeTeam.name,
        logo: match.homeTeam.crest,
      },
      create: {
        externalId: match.homeTeam.id,
        name: match.homeTeam.name,
        logo: match.homeTeam.crest,
      },
    });

    const awayTeam = await prisma.team.upsert({
      where: {
        externalId: match.awayTeam.id,
      },
      update: {
        name: match.awayTeam.name,
        logo: match.awayTeam.crest,
      },
      create: {
        externalId: match.awayTeam.id,
        name: match.awayTeam.name,
        logo: match.awayTeam.crest,
      },
    });

    await prisma.game.upsert({
      where: {
        externalId: match.id,
      },
      update: {
        date: new Date(match.utcDate),
        timestamp: Math.floor(new Date(match.utcDate).getTime() / 1000),

        statusLong: match.status,
        statusShort: match.status,
        elapsed: null,

        round: formatRound(match),

        homeGoals: match.score.fullTime.home,
        awayGoals: match.score.fullTime.away,

        halfHome: match.score.halfTime.home,
        halfAway: match.score.halfTime.away,

        fullHome: match.score.fullTime.home,
        fullAway: match.score.fullTime.away,

        canGuess: match.status === "TIMED",

        homeTeamId: homeTeam.id,
        awayTeamId: awayTeam.id,
      },
      create: {
        externalId: match.id,

        date: new Date(match.utcDate),
        timestamp: Math.floor(new Date(match.utcDate).getTime() / 1000),

        statusLong: match.status,
        statusShort: match.status,
        elapsed: null,

        round: formatRound(match),

        homeGoals: match.score.fullTime.home,
        awayGoals: match.score.fullTime.away,

        halfHome: match.score.halfTime.home,
        halfAway: match.score.halfTime.away,

        fullHome: match.score.fullTime.home,
        fullAway: match.score.fullTime.away,

        canGuess: match.status === "TIMED",

        homeTeamId: homeTeam.id,
        awayTeamId: awayTeam.id,
      },
    });

    syncedMatches++;
  }

  return {
    totalMatchesFromApi: matches.length,
    syncedMatches,
    skippedMatches,
  };
}
