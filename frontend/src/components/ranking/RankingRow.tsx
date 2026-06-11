import { theme } from "../../styles/theme";
import type { RankingUser } from "../../types/ranking";

type RankingRowProps = {
  user: RankingUser;
  isLeader: boolean;
  isCurrentUser: boolean;
  positionLabel: string;
};

export function RankingRow({
  user,
  isLeader,
  isCurrentUser,
  positionLabel,
}: RankingRowProps) {
  return (
    <div
      className={`flex items-center justify-between rounded-xl border p-4 ${
        isLeader
          ? "border-app-gold bg-app-card-soft"
          : isCurrentUser
            ? "border-app-primary bg-app-primary/5"
            : "border-app-border bg-app-surface"
      }`}
    >
      <div className="flex min-w-0 items-center gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold ${
            isLeader
              ? "bg-app-gold/10 text-app-gold"
              : "bg-app-card-soft text-app-text"
          }`}
        >
          {positionLabel}
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="truncate font-semibold text-app-text">{user.name}</p>

            {isLeader && (
              <span className="rounded-full bg-app-gold/10 px-2 py-0.5 text-xs font-semibold text-app-gold">
                Líder
              </span>
            )}

            {isCurrentUser && (
              <span className="rounded-full bg-app-primary/10 px-2 py-0.5 text-xs font-semibold text-app-primary">
                Você
              </span>
            )}
          </div>

          <p className={`text-sm ${theme.text.subtle}`}>
            {user.exactScores} placares exatos • {user.correctResults}{" "}
            resultados
          </p>
        </div>
      </div>

      <div className="text-right">
        <p className="text-lg font-bold text-app-gold">{user.points}</p>
        <p className={`text-xs ${theme.text.subtle}`}>pontos</p>
      </div>
    </div>
  );
}
