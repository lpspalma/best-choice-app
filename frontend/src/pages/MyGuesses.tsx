import { useState } from "react";

import { GameTeam } from "../components/game/GameTeam";
import { PageContainer } from "../components/layout/PageContainer";
import { UserGuessesList } from "../components/guesses/UserGuessesList";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { PageHeader } from "../components/ui/PageHeader";
import { Button } from "../components/ui/Button";
import { EmptyState } from "../components/ui/EmptyState";
import { mockMyGuesses } from "../mocks/myGuesses.mock";
import { theme } from "../styles/theme";
import type { MyGuess } from "../types/myGuess";
import { formatGameDateTime } from "../utils/formatters/date";
import { DateTabs } from "../components/ui/DateTabs";
import { getRoundLabel } from "../utils/translators/round";

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
          variant={activeTab === "my-guesses" ? "primary" : "secondary"}
        >
          Meus Palpites
        </Button>

        <Button
          type="button"
          onClick={() => setActiveTab("user-guesses")}
          variant={activeTab === "user-guesses" ? "primary" : "secondary"}
        >
          Usuários
        </Button>
      </div>

      <div className="max-w-full space-y-4 overflow-hidden">
        <section
          className={activeTab === "my-guesses" ? "block" : "hidden md:block"}
        >
          <DateTabs
            dates={availableDates}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            showAllOption
          />

          <div className="max-w-full space-y-4 overflow-hidden">
            {filteredGuesses.length === 0 ? (
              <EmptyState
                title="Nenhum palpite encontrado"
                description="Não existem jogos disponíveis para esta data."
              />
            ) : (
              filteredGuesses.map((guess) => (
                <GuessCard
                  key={guess.id}
                  guess={guess}
                  currentGuess={editableGuesses[guess.id]}
                  onGuessChange={handleGuessChange}
                  onSaveGuess={handleSaveGuess}
                />
              ))
            )}
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

type GuessCardProps = {
  guess: MyGuess;
  currentGuess: EditableGuess;
  onGuessChange: (
    guessId: string,
    field: keyof EditableGuess,
    value: string,
  ) => void;
  onSaveGuess: (guess: MyGuess) => void;
};

function GuessCard({
  guess,
  currentGuess,
  onGuessChange,
  onSaveGuess,
}: GuessCardProps) {
  return (
    <Card>
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-app-primary">
            {getRoundLabel(guess.game.league.round)}
          </p>

          <p className={theme.text.subtitle}>
            {formatGameDateTime(guess.game.date)} • {guess.game.venue.name},{" "}
            {guess.game.venue.city}
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
              onGuessChange(guess.id, "homeGuess", event.target.value)
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
              onGuessChange(guess.id, "awayGuess", event.target.value)
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
          <Button type="button" onClick={() => onSaveGuess(guess)}>
            Salvar palpite
          </Button>
        ) : (
          <p className={theme.text.subtitle}>
            Este palpite não pode mais ser alterado.
          </p>
        )}
      </div>
    </Card>
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

function getScoreInputClassName(canGuess: boolean) {
  return `
    h-9 w-9 text-center text-sm font-bold md:h-12 md:w-14 md:text-lg
    ${canGuess ? "focus:border-app-primary" : "cursor-not-allowed opacity-60"}
  `;
}
