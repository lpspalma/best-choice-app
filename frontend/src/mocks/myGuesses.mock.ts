import type { MyGuess } from "../types/myGuess";

export const mockMyGuesses: MyGuess[] = [
  {
    id: "guess-1",
    userId: "user-1",

    game: {
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

    homeGuess: 2,

    awayGuess: 1,

    points: null,

    createdAt: "2026-06-10T12:00:00Z",

    updatedAt: "2026-06-10T12:00:00Z",
  },
  {
    id: "guess-2",
    userId: "user-1",

    game: {
      id: 123457,
      date: "2026-06-19T16:00:00+00:00",
      timestamp: 1781884800,

      venue: {
        id: 18,
        name: "SoFi Stadium",
        city: "Los Angeles",
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
        home: null,
        away: null,
      },

      canGuess: true,
    },

    homeGuess: null,
    awayGuess: null,
    points: null,
    createdAt: "2026-06-10T12:00:00Z",
    updatedAt: "2026-06-10T12:00:00Z",
  },

  {
    id: "guess-3",
    userId: "user-1",

    game: {
      id: 123458,
      date: "2026-06-20T22:00:00+00:00",
      timestamp: 1781992800,

      venue: {
        id: 22,
        name: "Hard Rock Stadium",
        city: "Miami",
      },

      status: {
        long: "Not Started",
        short: "NS",
        elapsed: null,
      },

      league: {
        round: "Group Stage - Round 3",
      },

      teams: {
        home: {
          id: 10,
          name: "France",
          logo: "https://media.api-sports.io/football/teams/10.png",
        },

        away: {
          id: 26,
          name: "Portugal",
          logo: "https://media.api-sports.io/football/teams/26.png",
        },
      },

      goals: {
        home: null,
        away: null,
      },

      canGuess: false,
    },

    homeGuess: 1,
    awayGuess: 2,
    points: null,
    createdAt: "2026-06-10T12:00:00Z",
    updatedAt: "2026-06-10T12:00:00Z",
  },
];
