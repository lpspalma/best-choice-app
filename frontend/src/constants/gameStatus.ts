export const GAME_STATUSES = [
  "TIMED",
  "SCHEDULED",
  "IN_PLAY",
  "PAUSED",
  "FINISHED",
  "POSTPONED",
  "SUSPENDED",
  "CANCELLED",
] as const;

export type FixtureStatus = (typeof GAME_STATUSES)[number];

export const GAME_STATUS_LABELS_PT: Record<FixtureStatus, string> = {
  TIMED: "Agendado",
  SCHEDULED: "Agendado",

  IN_PLAY: "Ao vivo",
  PAUSED: "Intervalo",

  FINISHED: "Encerrado",

  POSTPONED: "Adiado",
  SUSPENDED: "Suspenso",
  CANCELLED: "Cancelado",
};
