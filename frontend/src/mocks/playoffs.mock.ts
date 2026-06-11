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
    id: 987004,
    date: "2026-07-02T21:00:00+00:00",
    timestamp: 1783026000,
    venue: {
      id: null,
      name: "AT&T Stadium",
      city: "Dallas",
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
        id: 14,
        name: "Germany",
        logo: "https://media.api-sports.io/football/teams/14.png",
        winner: null,
      },
      away: {
        id: 21,
        name: "Japan",
        logo: "https://media.api-sports.io/football/teams/21.png",
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
    id: 987005,
    date: "2026-07-03T18:00:00+00:00",
    timestamp: 1783101600,
    venue: {
      id: null,
      name: "BC Place",
      city: "Vancouver",
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
        id: 9,
        name: "Argentina",
        logo: "https://media.api-sports.io/football/teams/9.png",
        winner: null,
      },
      away: {
        id: 33,
        name: "Canada",
        logo: "https://media.api-sports.io/football/teams/33.png",
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
    id: 987006,
    date: "2026-07-04T20:00:00+00:00",
    timestamp: 1783195200,
    venue: {
      id: null,
      name: "Hard Rock Stadium",
      city: "Miami",
    },
    status: {
      long: "Match Finished",
      short: "FT",
      elapsed: 90,
    },
    league: {
      round: "Round of 16",
    },
    teams: {
      home: {
        id: 6,
        name: "Brazil",
        logo: "https://media.api-sports.io/football/teams/6.png",
        winner: true,
      },
      away: {
        id: 21,
        name: "Japan",
        logo: "https://media.api-sports.io/football/teams/21.png",
        winner: false,
      },
    },
    goals: {
      home: 2,
      away: 0,
    },
    canGuess: false,
  },
  {
    id: 987007,
    date: "2026-07-05T20:00:00+00:00",
    timestamp: 1783281600,
    venue: {
      id: null,
      name: "Gillette Stadium",
      city: "Boston",
    },
    status: {
      long: "Match Finished",
      short: "FT",
      elapsed: 90,
    },
    league: {
      round: "Round of 16",
    },
    teams: {
      home: {
        id: 2,
        name: "France",
        logo: "https://media.api-sports.io/football/teams/2.png",
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
      home: 1,
      away: 0,
    },
    canGuess: false,
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
    id: 987008,
    date: "2026-07-07T22:00:00+00:00",
    timestamp: 1783452000,
    venue: {
      id: null,
      name: "Lumen Field",
      city: "Seattle",
    },
    status: {
      long: "Match Finished",
      short: "FT",
      elapsed: 90,
    },
    league: {
      round: "Quarter-finals",
    },
    teams: {
      home: {
        id: 6,
        name: "Brazil",
        logo: "https://media.api-sports.io/football/teams/6.png",
        winner: true,
      },
      away: {
        id: 33,
        name: "Canada",
        logo: "https://media.api-sports.io/football/teams/33.png",
        winner: false,
      },
    },
    goals: {
      home: 3,
      away: 1,
    },
    canGuess: false,
  },
  {
    id: 987009,
    date: "2026-07-14T20:00:00+00:00",
    timestamp: 1784059200,
    venue: {
      id: null,
      name: "Mercedes-Benz Stadium",
      city: "Atlanta",
    },
    status: {
      long: "Not Started",
      short: "NS",
      elapsed: null,
    },
    league: {
      round: "Semi-finals",
    },
    teams: {
      home: {
        id: 6,
        name: "Brazil",
        logo: "https://media.api-sports.io/football/teams/6.png",
        winner: null,
      },
      away: {
        id: 9,
        name: "Argentina",
        logo: "https://media.api-sports.io/football/teams/9.png",
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
    id: 987010,
    date: "2026-07-15T20:00:00+00:00",
    timestamp: 1784145600,
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
      round: "Semi-finals",
    },
    teams: {
      home: {
        id: 2,
        name: "France",
        logo: "https://media.api-sports.io/football/teams/2.png",
        winner: null,
      },
      away: {
        id: 14,
        name: "Germany",
        logo: "https://media.api-sports.io/football/teams/14.png",
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
