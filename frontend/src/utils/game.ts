import type { FixtureStatus, Game } from "../types/game";

export function getGameStatusLabel(game: Game) {
  const { short, elapsed } = game.status;

  const labels: Record<FixtureStatus, string> = {
    NS: "Não iniciado",
    "1H": elapsed ? `${elapsed}'` : "Ao vivo",
    HT: "Intervalo",
    "2H": elapsed ? `${elapsed}'` : "Ao vivo",
    ET: "Prorrogação",
    P: "Pênaltis",
    FT: "Encerrado",
  };

  return labels[short];
}

export function getGameStatusClassName(status: FixtureStatus) {
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
