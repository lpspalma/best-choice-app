import { GAME_STATUS_LABELS_PT } from "../../constants/gameStatus";
import type { Game } from "../../types/game";

export function getGameStatusLabel(game: Game) {
  const { short, elapsed } = game.status;

  if ((short === "1H" || short === "2H") && elapsed) {
    return `${elapsed}'`;
  }

  return GAME_STATUS_LABELS_PT[short];
}

export function getGameStatusClassName(status: Game["status"]["short"]) {
  const baseClass = "shrink-0 rounded-full px-3 py-1 text-xs font-semibold";

  if (status === "NS") {
    return `${baseClass} bg-app-surface text-app-muted`;
  }

  if (status === "FT") {
    return `${baseClass} bg-app-card-soft text-app-subtle`;
  }

  if (status === "HT") {
    return `${baseClass} bg-app-gold/15 text-app-gold`;
  }

  return `${baseClass} bg-app-danger/15 text-app-danger`;
}
