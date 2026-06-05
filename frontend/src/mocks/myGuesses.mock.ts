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
];
