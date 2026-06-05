import type { Game } from "../types/game";

export const mockGames: Game[] = [
  {
    id: 123456,

    date: "2026-06-18T19:00:00+00:00",

    timestamp: 1781809200,

    venue: {
      id: 15,
      name: "MetLife Stadium",
      city: "New York",
    },

    status: {
      long: "Not Started",
      short: "NS",
      elapsed: null,
    },

    league: {
      round: "Group Stage - Round 2",
    },

    teams: {
      home: {
        id: 6,
        name: "Brazil",
        logo: "https://media.api-sports.io/football/teams/6.png",
      },

      away: {
        id: 14,
        name: "Germany",
        logo: "https://media.api-sports.io/football/teams/14.png",
      },
    },

    goals: {
      home: null,
      away: null,
    },

    canGuess: true,
  },

  {
    id: 123457,

    date: "2026-06-19T16:00:00+00:00",

    timestamp: 1781884800,

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
      round: "Group Stage - Round 2",
    },

    teams: {
      home: {
        id: 9,
        name: "Argentina",
        logo: "https://media.api-sports.io/football/teams/9.png",
      },

      away: {
        id: 25,
        name: "Mexico",
        logo: "https://media.api-sports.io/football/teams/25.png",
      },
    },

    goals: {
      home: 2,
      away: 1,
    },

    canGuess: false,
  },

  {
    id: 123458,

    date: "2026-06-20T20:00:00+00:00",

    timestamp: 1781971200,

    venue: {
      id: 21,
      name: "AT&T Stadium",
      city: "Dallas",
    },

    status: {
      long: "First Half",
      short: "1H",
      elapsed: 37,
    },

    league: {
      round: "Group Stage - Round 3",
    },

    teams: {
      home: {
        id: 2,
        name: "France",
        logo: "https://media.api-sports.io/football/teams/2.png",
      },

      away: {
        id: 4,
        name: "England",
        logo: "https://media.api-sports.io/football/teams/4.png",
      },
    },

    goals: {
      home: 1,
      away: 0,
    },

    canGuess: false,
  },
];
