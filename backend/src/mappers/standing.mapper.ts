import { getTeamNamePt } from "../utils/team.utils";

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

type DbStanding = {
  rank: number;

  points: number;

  played: number;
  win: number;
  draw: number;
  lose: number;

  goalsFor: number;
  goalsAgainst: number;
  goalsDiff: number;

  group: string;
};

export function mapFootballDataStandingToDb(
  standing: FootballDataStandingRow,
  group: string,
): DbStanding {
  return {
    rank: standing.position,

    points: standing.points,

    played: standing.playedGames,
    win: standing.won,
    draw: standing.draw,
    lose: standing.lost,

    goalsFor: standing.goalsFor,
    goalsAgainst: standing.goalsAgainst,
    goalsDiff: standing.goalDifference,

    group,
  };
}

export function mapDbStandingToResponse(standing: any) {
  return {
    rank: standing.rank,

    team: {
      id: standing.team.externalId,
      name: standing.team.name,
      namePt: getTeamNamePt(standing.team.externalId, standing.team.name),
      logo: standing.team.logo,
    },

    points: standing.points,

    goalsDiff: standing.goalsDiff,

    group: standing.group,

    played: standing.played,
    win: standing.win,
    draw: standing.draw,
    lose: standing.lose,

    goalsFor: standing.goalsFor,
    goalsAgainst: standing.goalsAgainst,
  };
}
