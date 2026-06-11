import type { FixtureStatus } from "../types/game";

export const GAME_STATUS_LABELS_PT: Record<FixtureStatus, string> = {
  NS: "Não iniciado",
  "1H": "Ao vivo",
  HT: "Intervalo",
  "2H": "Ao vivo",
  ET: "Prorrogação",
  P: "Pênaltis",
  FT: "Encerrado",
};
