import type { Game } from "../../types/game";
import {
  getGameStatusClassName,
  getGameStatusLabel,
} from "../../utils/translators/gameStatus";

type GameStatusBadgeProps = {
  game: Game;
};

export function GameStatusBadge({ game }: GameStatusBadgeProps) {
  return (
    <span className={getGameStatusClassName(game.status.short)}>
      {getGameStatusLabel(game)}
    </span>
  );
}
