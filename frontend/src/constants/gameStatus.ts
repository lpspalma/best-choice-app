import type { FixtureStatus } from "../types/game";

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
