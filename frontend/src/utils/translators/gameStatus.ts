import { GAME_STATUS_LABELS_PT } from "../../constants/gameStatus";
import type { Game } from "../../types/game";

export function getGameStatusLabel(game: Game) {
  const { short, elapsed } = game.status;

  if (short === "IN_PLAY" && elapsed) {
    return `${elapsed}'`;
  }

  return GAME_STATUS_LABELS_PT[short] ?? short;
}

export function getGameStatusClassName(status: Game["status"]["short"]) {
  const baseClass = "shrink-0 rounded-full px-3 py-1 text-xs font-semibold";

  if (status === "TIMED" || status === "SCHEDULED") {
    return `${baseClass} bg-app-surface text-app-muted`;
  }

  if (status === "FINISHED") {
    return `${baseClass} bg-app-card-soft text-app-subtle`;
  }

  if (status === "PAUSED") {
    return `${baseClass} bg-app-gold/15 text-app-gold`;
  }

  if (status === "IN_PLAY") {
    return `${baseClass} bg-app-danger/15 text-app-danger`;
  }

  return `${baseClass} bg-app-surface text-app-muted`;
}
