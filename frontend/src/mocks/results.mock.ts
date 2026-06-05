import type { Game } from "../types/game";

export const mockResults: Game[] = [
  {
    id: 300001,

    date: "2026-06-18T19:00:00+00:00",

    timestamp: 1781809200,

    venue: {
      id: 15,
      name: "MetLife Stadium",
      city: "New York",
    },

    status: {
      long: "Match Finished",
      short: "FT",
      elapsed: 90,
    },

    league: {
      round: "Group Stage - Round 1",
    },

    teams: {
      home: {
        id: 6,
        name: "Brazil",
        logo: "https://media.api-sports.io/football/teams/6.png",
        winner: true,
      },

      away: {
        id: 14,
        name: "Germany",
        logo: "https://media.api-sports.io/football/teams/14.png",
        winner: false,
      },
    },

    goals: {
      home: 2,
      away: 1,
    },

    score: {
      halftime: {
        home: 1,
        away: 0,
      },

      fulltime: {
        home: 2,
        away: 1,
      },
    },

    canGuess: false,
  },

  {
    id: 300002,

    date: "2026-06-18T22:00:00+00:00",

    timestamp: 1781820000,

    venue: {
      id: 18,
      name: "SoFi Stadium",
      city: "Los Angeles",
    },

    status: {
      long: "Match Finished",
      short: "FT",
      elapsed: 90,
    },

    league: {
      round: "Group Stage - Round 1",
    },

    teams: {
      home: {
        id: 9,
        name: "Argentina",
        logo: "https://media.api-sports.io/football/teams/9.png",
        winner: false,
      },

      away: {
        id: 25,
        name: "Mexico",
        logo: "https://media.api-sports.io/football/teams/25.png",
        winner: false,
      },
    },

    goals: {
      home: 1,
      away: 1,
    },

    score: {
      halftime: {
        home: 1,
        away: 0,
      },

      fulltime: {
        home: 1,
        away: 1,
      },
    },

    canGuess: false,
  },

  {
    id: 300003,

    date: "2026-07-06T20:00:00+00:00",

    timestamp: 1783368000,

    venue: {
      id: 25,
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
    id: 300004,

    date: "2026-07-19T19:00:00+00:00",

    timestamp: 1784487600,

    venue: {
      id: 15,
      name: "MetLife Stadium",
      city: "New York",
    },

    status: {
      long: "Match Finished",
      short: "FT",
      elapsed: 90,
    },

    league: {
      round: "Final",
    },

    teams: {
      home: {
        id: 6,
        name: "Brazil",
        logo: "https://media.api-sports.io/football/teams/6.png",
        winner: true,
      },

      away: {
        id: 2,
        name: "France",
        logo: "https://media.api-sports.io/football/teams/2.png",
        winner: false,
      },
    },

    goals: {
      home: 3,
      away: 2,
    },

    score: {
      halftime: {
        home: 2,
        away: 1,
      },

      fulltime: {
        home: 3,
        away: 2,
      },
    },

    canGuess: false,
  },
];
