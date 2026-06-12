import { GameTeam } from "../game/GameTeam";
import { Card } from "../ui/Card";
import { mockUserGuesses } from "../../mocks/userGuesses.mock";
import { theme } from "../../styles/theme";
import { getRoundLabel } from "../../utils/translators/round";
import { GameScore } from "../game/GameScore";
import { formatGameDateTime } from "../../utils/formatters/date";

export function UserGuessesList() {
  return (
    <div className="max-w-full space-y-4 overflow-hidden">
      {mockUserGuesses.map((guess) => (
        <Card key={guess.id}>
          <div className="mb-4 flex items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-app-card-soft">
                {guess.user.avatar ? (
                  <img
                    src={guess.user.avatar}
                    alt={guess.user.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-sm font-bold text-app-muted">
                    {guess.user.name.slice(0, 2).toUpperCase()}
                  </span>
                )}
              </div>

              <div className="min-w-0">
                <p className="truncate font-semibold text-app-text">
                  {guess.user.name}
                </p>

                <p className={theme.text.subtitle}>
                  #{guess.position} • {guess.points} pontos
                </p>
              </div>
            </div>

            <span className="shrink-0 rounded-full bg-app-card-soft px-2 py-1 text-xs font-semibold text-app-muted md:px-3">
              Sem edição
            </span>
          </div>

          <div className="mb-4">
            <p className="text-sm font-semibold text-app-primary">
              {getRoundLabel(guess.game.league.round)}
            </p>

            <p className={theme.text.subtitle}>
              {formatGameDateTime(guess.game.date)} • {guess.game.venue.name},{" "}
              {guess.game.venue.city}
            </p>
          </div>

          <div className="grid min-w-0 grid-cols-[1fr_auto_1fr] items-center gap-2 overflow-hidden">
            <GameTeam
              name={guess.game.teams.home.name}
              logo={guess.game.teams.home.logo}
            />

            <div className="shrink-0 rounded-xl bg-app-surface px-3 py-2 text-base font-bold text-app-text md:px-4 md:text-lg">
              <GameScore
                homeScore={guess.homeGuess}
                awayScore={guess.awayGuess}
              />
            </div>

            <GameTeam
              name={guess.game.teams.away.name}
              logo={guess.game.teams.away.logo}
              alignRight
            />
          </div>
        </Card>
      ))}
    </div>
  );
}
