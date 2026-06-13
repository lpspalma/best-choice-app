import { footballDataApi } from "../lib/apiFootball";
import { prisma } from "../lib/prisma";

import { mapFootballDataStandingToDb } from "../mappers/standing.mapper";

type FootballDataStandingsResponse = {
  standings: FootballDataStandingGroup[];
};

type FootballDataStandingGroup = {
  group?: string;
  table: FootballDataStandingRow[];
};

type FootballDataStandingRow = {
  position: number;

  team: {
    id: number;
    name: string;
    crest?: string | null;
  };

  playedGames: number;
  won: number;
  draw: number;
  lost: number;

  points: number;

  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
};

export async function syncWorldCupStandingsService() {
  const response = await footballDataApi.get<FootballDataStandingsResponse>(
    "/competitions/WC/standings",
  );

  const standingsGroups = response.data.standings;

  await prisma.standing.deleteMany();

  let syncedStandings = 0;

  for (const standingGroup of standingsGroups) {
    const groupName = standingGroup.group ?? "Group";

    for (const standingRow of standingGroup.table) {
      const mappedStanding = mapFootballDataStandingToDb(
        standingRow,
        groupName,
      );

      const team = await prisma.team.upsert({
        where: {
          externalId: standingRow.team.id,
        },
        update: {
          name: standingRow.team.name,
          logo: standingRow.team.crest,
        },
        create: {
          externalId: standingRow.team.id,
          name: standingRow.team.name,
          logo: standingRow.team.crest,
        },
      });

      await prisma.standing.create({
        data: {
          ...mappedStanding,

          teamId: team.id,
        },
      });

      syncedStandings++;
    }
  }

  return {
    groups: standingsGroups.length,
    syncedStandings,
  };
}
