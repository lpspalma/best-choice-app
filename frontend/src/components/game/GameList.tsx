import type { Game } from "../../types/game";
import { EmptyState } from "../ui/EmptyState";
import { GameCard } from "./GameCard";
import { ResultGameCard } from "./ResultGameCard";

type GameListProps = {
  games: Game[];
  emptyTitle: string;
  emptyDescription: string;
};

export function GameList({
  games,
  emptyTitle,
  emptyDescription,
}: GameListProps) {
  if (games.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <>
      {games.map((game) =>
        game.status.short === "FINISHED" ? (
          <ResultGameCard key={game.id} game={game} />
        ) : (
          <GameCard key={game.id} game={game} />
        ),
      )}
    </>
  );
}
