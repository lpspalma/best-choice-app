import type { Game } from "../types/game";

export const mockPlayoffs: Game[] = [
  {
    id: 987001,
    date: "2026-07-02T18:00:00+00:00",
    timestamp: 1783015200,

    venue: {
      id: null,
      name: "SoFi Stadium",
      city: "Los Angeles",
    },

    status: {
      long: "Not Started",
      short: "NS",
      elapsed: null,
    },

    league: {
      round: "Round of 32",
    },

    teams: {
      home: {
        id: 6,
        name: "Brazil",
        logo: "https://media.api-sports.io/football/teams/6.png",
        winner: null,
      },
      away: {
        id: 19,
        name: "Mexico",
        logo: "https://media.api-sports.io/football/teams/19.png",
        winner: null,
      },
    },

    goals: {
      home: null,
      away: null,
    },

    canGuess: true,
  },

  {
    id: 987002,
    date: "2026-07-06T20:00:00+00:00",
    timestamp: 1783368000,

    venue: {
      id: null,
      name: "Arrowhead Stadium",
      city: "Kansas City",
    },

    status: {
      long: "Match Finished",
      short: "FT",
      elapsed: 120,
    },

    league: {
      round: "Quarter-finals",
    },

    teams: {
      home: {
        id: 2,
        name: "France",
        logo: "https://media.api-sports.io/football/teams/2.png",
        winner: false,
      },
      away: {
        id: 9,
        name: "Argentina",
        logo: "https://media.api-sports.io/football/teams/9.png",
        winner: true,
      },
    },

    goals: {
      home: 1,
      away: 1,
    },

    score: {
      halftime: {
        home: 0,
        away: 1,
      },
      fulltime: {
        home: 1,
        away: 1,
      },
      extratime: {
        home: 1,
        away: 1,
      },
      penalty: {
        home: 3,
        away: 4,
      },
    },

    canGuess: false,
  },

  {
    id: 987003,
    date: "2026-07-19T19:00:00+00:00",
    timestamp: 1784487600,

    venue: {
      id: null,
      name: "MetLife Stadium",
      city: "New York",
    },

    status: {
      long: "Not Started",
      short: "NS",
      elapsed: null,
    },

    league: {
      round: "Final",
    },

    teams: {
      home: {
        id: 6,
        name: "Brazil",
        logo: "https://media.api-sports.io/football/teams/6.png",
        winner: null,
      },
      away: {
        id: 2,
        name: "France",
        logo: "https://media.api-sports.io/football/teams/2.png",
        winner: null,
      },
    },

    goals: {
      home: null,
      away: null,
    },

    canGuess: true,
  },
];
