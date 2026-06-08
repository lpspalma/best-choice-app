import { useState } from "react";

import { GameTeam } from "../components/game/GameTeam";
import { PageContainer } from "../components/layout/PageContainer";
import { UserGuessesList } from "../components/guesses/UserGuessesList";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { PageHeader } from "../components/ui/PageHeader";
import { mockMyGuesses } from "../mocks/myGuesses.mock";
import { theme } from "../styles/theme";
import type { MyGuess } from "../types/myGuess";
import { Button } from "../components/ui/Button";

type GuessTab = "my-guesses" | "user-guesses";

type EditableGuess = {
  homeGuess: number | null;
  awayGuess: number | null;
};

export function MyGuesses() {
  const [activeTab, setActiveTab] = useState<GuessTab>("my-guesses");
  const [selectedDate, setSelectedDate] = useState<string>("all");

  const [editableGuesses, setEditableGuesses] = useState<
    Record<string, EditableGuess>
  >(() =>
    mockMyGuesses.reduce<Record<string, EditableGuess>>((acc, guess) => {
      acc[guess.id] = {
        homeGuess: guess.homeGuess,
        awayGuess: guess.awayGuess,
      };

      return acc;
    }, {}),
  );

  const availableDates = getAvailableDates(mockMyGuesses);

  const filteredGuesses =
    selectedDate === "all"
      ? mockMyGuesses
      : mockMyGuesses.filter(
          (guess) => getDateKey(guess.game.date) === selectedDate,
        );

  function handleGuessChange(
    guessId: string,
    field: keyof EditableGuess,
    value: string,
  ) {
    setEditableGuesses((currentGuesses) => ({
      ...currentGuesses,
      [guessId]: {
        ...currentGuesses[guessId],
        [field]: value === "" ? null : Number(value),
      },
    }));
  }

  function handleSaveGuess(guess: MyGuess) {
    const currentGuess = editableGuesses[guess.id];

    console.log("Mock save guess", {
      guessId: guess.id,
      gameId: guess.game.id,
      homeGuess: currentGuess.homeGuess,
      awayGuess: currentGuess.awayGuess,
    });
  }

  return (
    <PageContainer>
      <PageHeader
        title="Meus Palpites"
        description="Acompanhe e edite seus palpites da Copa."
      />

      <div className="mb-4 grid grid-cols-2 gap-2 md:hidden">
        <Button
          type="button"
          onClick={() => setActiveTab("my-guesses")}
          className={getTabClassName(activeTab === "my-guesses")}
        >
          Meus Palpites
        </Button>

        <Button
          type="button"
          onClick={() => setActiveTab("user-guesses")}
          className={getTabClassName(activeTab === "user-guesses")}
        >
          Usuários
        </Button>
      </div>

      <div className="max-w-full space-y-4 overflow-hidden">
        <section
          className={activeTab === "my-guesses" ? "block" : "hidden md:block"}
        >
          <div className="-mx-1 mb-4 flex max-w-full gap-2 overflow-x-auto px-1 pb-1">
            <Button
              type="button"
              onClick={() => setSelectedDate("all")}
              className={getDateFilterClassName(selectedDate === "all")}
            >
              Todos
            </Button>

            {availableDates.map((date) => (
              <Button
                key={date}
                type="button"
                onClick={() => setSelectedDate(date)}
                className={getDateFilterClassName(selectedDate === date)}
              >
                {formatShortDate(date)}
              </Button>
            ))}
          </div>

          <div className="max-w-full space-y-4 overflow-hidden">
            {filteredGuesses.map((guess) => {
              const currentGuess = editableGuesses[guess.id];

              return (
                <Card key={guess.id}>
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-app-primary">
                        {guess.game.league.round}
                      </p>

                      <p className={theme.text.subtitle}>
                        {formatGameDate(guess.game.date)} •{" "}
                        {guess.game.venue.name}, {guess.game.venue.city}
                      </p>
                    </div>

                    {!guess.game.canGuess && (
                      <span className="shrink-0 rounded-full bg-app-card-soft px-2 py-1 text-xs font-semibold text-app-muted md:px-3">
                        Bloqueado
                      </span>
                    )}
                  </div>

                  <div className="grid min-w-0 grid-cols-[1fr_auto_1fr] items-center gap-2 overflow-hidden">
                    <GameTeam
                      name={guess.game.teams.home.name}
                      logo={guess.game.teams.home.logo}
                    />

                    <div className="flex w-32 shrink-0 items-center justify-center gap-1 md:w-auto">
                      <Input
                        type="number"
                        min="0"
                        disabled={!guess.game.canGuess}
                        value={currentGuess.homeGuess ?? ""}
                        onChange={(event) =>
                          handleGuessChange(
                            guess.id,
                            "homeGuess",
                            event.target.value,
                          )
                        }
                        className={getScoreInputClassName(guess.game.canGuess)}
                      />

                      <span className="font-bold text-app-muted">x</span>

                      <Input
                        type="number"
                        min="0"
                        disabled={!guess.game.canGuess}
                        value={currentGuess.awayGuess ?? ""}
                        onChange={(event) =>
                          handleGuessChange(
                            guess.id,
                            "awayGuess",
                            event.target.value,
                          )
                        }
                        className={getScoreInputClassName(guess.game.canGuess)}
                      />
                    </div>

                    <GameTeam
                      name={guess.game.teams.away.name}
                      logo={guess.game.teams.away.logo}
                      alignRight
                    />
                  </div>

                  <div className="mt-4 flex justify-end">
                    {guess.game.canGuess ? (
                      <button
                        type="button"
                        onClick={() => handleSaveGuess(guess)}
                        className="cursor-pointer rounded-xl bg-app-primary px-4 py-2 text-sm font-semibold text-white shadow-glow-green transition hover:brightness-110"
                      >
                        Salvar palpite
                      </button>
                    ) : (
                      <p className={theme.text.subtitle}>
                        Este palpite não pode mais ser alterado.
                      </p>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        <section
          className={
            activeTab === "user-guesses" ? "block" : "hidden md:hidden"
          }
        >
          <UserGuessesList />
        </section>
      </div>
    </PageContainer>
  );
}

function getAvailableDates(guesses: MyGuess[]) {
  return Array.from(
    new Set(guesses.map((guess) => getDateKey(guess.game.date))),
  );
}

function getDateKey(date: string) {
  return date.slice(0, 10);
}

function formatShortDate(date: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
  }).format(new Date(`${date}T00:00:00`));
}

function formatGameDate(date: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

function getTabClassName(isActive: boolean) {
  return `
    cursor-pointer rounded-xl px-4 py-2 text-sm font-semibold transition
    ${
      isActive
        ? "bg-app-primary text-white shadow-glow-green"
        : "bg-app-surface text-app-muted hover:bg-app-card-soft hover:text-app-text"
    }
  `;
}

function getDateFilterClassName(isActive: boolean) {
  return `
    shrink-0 cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition
    ${
      isActive
        ? "bg-app-primary text-white shadow-glow-green"
        : "bg-app-surface text-app-muted hover:bg-app-card-soft hover:text-app-text"
    }
  `;
}

function getScoreInputClassName(canGuess: boolean) {
  return `
    h-9 w-9 text-center text-sm font-bold md:h-12 md:w-14 md:text-lg
    ${canGuess ? "focus:border-app-primary" : "cursor-not-allowed opacity-60"}
  `;
}
