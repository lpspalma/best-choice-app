import type { UserGuess } from "../types/userGuess";

export const mockUserGuesses: UserGuess[] = [
  {
    id: "user-guess-1",

    user: {
      id: "user-2",
      name: "Maria",
      avatar: "https://i.pravatar.cc/150?img=5",
    },

    position: 1,

    points: 18,

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
        short: "TIMED",
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

      canGuess: false,
    },

    homeGuess: 1,

    awayGuess: 1,
  },

  {
    id: "user-guess-2",

    user: {
      id: "user-3",
      name: "João",
      avatar: "https://i.pravatar.cc/150?img=8",
    },

    position: 2,

    points: 14,

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
        short: "TIMED",
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

      canGuess: false,
    },

    homeGuess: 2,

    awayGuess: 0,
  },
];
