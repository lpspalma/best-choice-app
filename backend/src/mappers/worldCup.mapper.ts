import type { Game } from "../types/game";
import { getTeamNamePt } from "../utils/team.utils";

type FootballDataMatch = {
  id: number;
  utcDate: string;
  status: string;
  matchday: number | null;
  stage: string | null;
  group: string | null;
  homeTeam: {
    id: number;
    name: string;
    shortName?: string;
    tla?: string;
    crest?: string;
  };
  awayTeam: {
    id: number;
    name: string;
    shortName?: string;
    tla?: string;
    crest?: string;
  };
  score: {
    winner: "HOME_TEAM" | "AWAY_TEAM" | "DRAW" | null;
    duration: string;
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

function mapStatus(status: string): Game["status"] {
  const statusMap: Record<string, Game["status"]> = {
    TIMED: {
      long: "Not Started",
      short: "NS",
      elapsed: null,
    },
    IN_PLAY: {
      long: "In Play",
      short: "1H",
      elapsed: null,
    },
    PAUSED: {
      long: "Halftime",
      short: "HT",
      elapsed: 45,
    },
    FINISHED: {
      long: "Match Finished",
      short: "FT",
      elapsed: 90,
    },
  };

  return (
    statusMap[status] ?? {
      long: status,
      short: "NS",
      elapsed: null,
    }
  );
}

function getWinnerFlags(winner: FootballDataMatch["score"]["winner"]) {
  return {
    home: winner === "HOME_TEAM",
    away: winner === "AWAY_TEAM",
  };
}

function formatRound(match: FootballDataMatch) {
  if (match.stage === "GROUP_STAGE") {
    return `Group Stage - Round ${match.matchday ?? ""}`.trim();
  }

  return match.stage?.replace("_", " ") ?? "World Cup";
}

export function mapFootballDataMatchToGame(match: FootballDataMatch): Game {
  const winner = getWinnerFlags(match.score.winner);

  return {
    id: match.id,
    date: match.utcDate,
    timestamp: Math.floor(new Date(match.utcDate).getTime() / 1000),

    status: mapStatus(match.status),

    league: {
      round: formatRound(match),
    },

    teams: {
      home: {
        id: match.homeTeam.id,
        name: match.homeTeam.name,
        namePt: getTeamNamePt(match.homeTeam.id, match.homeTeam.name),
        logo: match.homeTeam.crest,
        winner: winner.home,
      },
      away: {
        id: match.awayTeam.id,
        name: match.awayTeam.name,
        namePt: getTeamNamePt(match.awayTeam.id, match.awayTeam.name),
        logo: match.awayTeam.crest,
        winner: winner.away,
      },
    },

    goals: {
      home: match.score.fullTime.home,
      away: match.score.fullTime.away,
    },

    score: {
      halftime: {
        home: match.score.halfTime.home,
        away: match.score.halfTime.away,
      },
      fulltime: {
        home: match.score.fullTime.home,
        away: match.score.fullTime.away,
      },
    },

    canGuess: match.status === "TIMED",
  };
}
