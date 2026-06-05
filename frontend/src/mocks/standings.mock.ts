import type { StandingGroup } from "../types/standing";

export const mockStandings: StandingGroup[] = [
  [
    {
      rank: 1,
      team: {
        id: 6,
        name: "Brazil",
        logo: "https://media.api-sports.io/football/teams/6.png",
      },
      points: 7,
      goalsDiff: 5,
      group: "Group A",
      form: "WWD",
      status: "same",
      description: "Qualification - Round of 32",
      all: {
        played: 3,
        win: 2,
        draw: 1,
        lose: 0,
        goals: {
          for: 7,
          against: 2,
        },
      },
    },
    {
      rank: 2,
      team: {
        id: 14,
        name: "Germany",
        logo: "https://media.api-sports.io/football/teams/14.png",
      },
      points: 6,
      goalsDiff: 3,
      group: "Group A",
      form: "WLW",
      status: "same",
      description: "Qualification - Round of 32",
      all: {
        played: 3,
        win: 2,
        draw: 0,
        lose: 1,
        goals: {
          for: 5,
          against: 2,
        },
      },
    },
    {
      rank: 3,
      team: {
        id: 21,
        name: "Japan",
        logo: "https://media.api-sports.io/football/teams/21.png",
      },
      points: 4,
      goalsDiff: -1,
      group: "Group A",
      form: "WDL",
      status: "same",
      description: "Possible Best 3rd Place",
      all: {
        played: 3,
        win: 1,
        draw: 1,
        lose: 1,
        goals: {
          for: 3,
          against: 4,
        },
      },
    },
    {
      rank: 4,
      team: {
        id: 33,
        name: "Canada",
        logo: "https://media.api-sports.io/football/teams/33.png",
      },
      points: 0,
      goalsDiff: -7,
      group: "Group A",
      form: "LLL",
      status: "same",
      description: "Eliminated",
      all: {
        played: 3,
        win: 0,
        draw: 0,
        lose: 3,
        goals: {
          for: 1,
          against: 8,
        },
      },
    },
  ],
  [
    {
      rank: 1,
      team: {
        id: 9,
        name: "Argentina",
        logo: "https://media.api-sports.io/football/teams/9.png",
      },
      points: 9,
      goalsDiff: 6,
      group: "Group B",
      form: "WWW",
      status: "same",
      description: "Qualification - Round of 32",
      all: {
        played: 3,
        win: 3,
        draw: 0,
        lose: 0,
        goals: {
          for: 8,
          against: 2,
        },
      },
    },
    {
      rank: 2,
      team: {
        id: 2,
        name: "France",
        logo: "https://media.api-sports.io/football/teams/2.png",
      },
      points: 6,
      goalsDiff: 2,
      group: "Group B",
      form: "WWL",
      status: "same",
      description: "Qualification - Round of 32",
      all: {
        played: 3,
        win: 2,
        draw: 0,
        lose: 1,
        goals: {
          for: 5,
          against: 3,
        },
      },
    },
  ],
];
