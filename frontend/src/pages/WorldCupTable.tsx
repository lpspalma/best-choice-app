import { useMemo, useState } from "react";

import { GameTeam } from "../components/game/GameTeam";
import { PageContainer } from "../components/layout/PageContainer";
import { Card } from "../components/ui/Card";
import { PageHeader } from "../components/ui/PageHeader";
import { mockStandings } from "../mocks/standings.mock";
import { theme } from "../styles/theme";
import type { Game } from "../types/game";
import { mockPlayoffs } from "../mocks/playoffs.mock";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../components/ui/Button";

type TableTab = "groups" | "playoffs";

export function WorldCupTable() {
  const [activeTab, setActiveTab] = useState<TableTab>("groups");
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);

  const activeGroup = mockStandings[activeGroupIndex];
  const groupName = activeGroup?.[0]?.group ?? "Grupo";

  const canGoToPreviousGroup = activeGroupIndex > 0;
  const canGoToNextGroup = activeGroupIndex < mockStandings.length - 1;

  function handlePreviousGroup() {
    if (!canGoToPreviousGroup) return;
    setActiveGroupIndex((currentIndex) => currentIndex - 1);
  }

  function handleNextGroup() {
    if (!canGoToNextGroup) return;
    setActiveGroupIndex((currentIndex) => currentIndex + 1);
  }

  const translatedGroupName = useMemo(() => {
    return groupName.replace("Group", "Grupo");
  }, [groupName]);

  return (
    <PageContainer>
      <PageHeader
        title="Tabela da Copa"
        description="Acompanhe grupos, classificação e fases da competição."
      />

      <div className="flex rounded-2xl border border-app-border bg-app-surface p-1">
        <Button
          type="button"
          variant={activeTab === "groups" ? "primary" : "ghost"}
          onClick={() => setActiveTab("groups")}
          className="flex-1"
        >
          Grupos
        </Button>

        <Button
          type="button"
          variant={activeTab === "playoffs" ? "primary" : "ghost"}
          onClick={() => setActiveTab("playoffs")}
          className="flex-1"
        >
          Mata-mata
        </Button>
      </div>

      {activeTab === "groups" && (
        <Card className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={handlePreviousGroup}
              disabled={!canGoToPreviousGroup}
              className="flex items-center justify-center gap-2 px-3 md:px-4"
            >
              <ChevronLeft size={18} />

              <span className="hidden md:inline">Anterior</span>
            </Button>

            <div className="text-center">
              <p className="text-lg font-bold text-app-text">
                {translatedGroupName}
              </p>

              <p className={`text-xs ${theme.text.subtle}`}>
                {activeGroupIndex + 1} de {mockStandings.length}
              </p>
            </div>

            <Button
              type="button"
              variant="secondary"
              onClick={handleNextGroup}
              disabled={!canGoToNextGroup}
              className="flex items-center justify-center gap-2 px-3 md:px-4"
            >
              <span className="hidden md:inline">Próximo</span>

              <ChevronRight size={18} />
            </Button>
          </div>

          <div className="hidden md:block">
            <table className="w-full text-sm">
              <thead>
                <tr
                  className={`border-b border-app-border ${theme.text.subtle}`}
                >
                  <th className="py-3 text-left font-semibold">#</th>
                  <th className="py-3 text-left font-semibold">Seleção</th>
                  <th className="py-3 text-center font-semibold">J</th>
                  <th className="py-3 text-center font-semibold">V</th>
                  <th className="py-3 text-center font-semibold">E</th>
                  <th className="py-3 text-center font-semibold">D</th>
                  <th className="py-3 text-center font-semibold">GP</th>
                  <th className="py-3 text-center font-semibold">GC</th>
                  <th className="py-3 text-center font-semibold">SG</th>
                  <th className="py-3 text-center font-semibold">PTS</th>
                  <th className="py-3 text-left font-semibold">Status</th>
                </tr>
              </thead>

              <tbody>
                {activeGroup.map((standing) => {
                  const isQualified =
                    standing.description?.includes("Qualification");

                  return (
                    <tr
                      key={standing.team.id}
                      className={`border-b border-app-border last:border-b-0 ${
                        isQualified
                          ? "border-l-4 border-app-primary bg-app-primary/10"
                          : ""
                      }`}
                    >
                      <td className="py-4 font-bold text-app-text">
                        {standing.rank}
                      </td>

                      <td className="py-4">
                        <GameTeam
                          name={standing.team.name}
                          logo={standing.team.logo}
                        />
                      </td>

                      <td className="py-4 text-center text-app-text">
                        {standing.all?.played ?? 0}
                      </td>
                      <td className="py-4 text-center text-app-text">
                        {standing.all?.win ?? 0}
                      </td>
                      <td className="py-4 text-center text-app-text">
                        {standing.all?.draw ?? 0}
                      </td>
                      <td className="py-4 text-center text-app-text">
                        {standing.all?.lose ?? 0}
                      </td>
                      <td className="py-4 text-center text-app-text">
                        {standing.all?.goals?.for ?? 0}
                      </td>
                      <td className="py-4 text-center text-app-text">
                        {standing.all?.goals?.against ?? 0}
                      </td>
                      <td className="py-4 text-center text-app-text">
                        {standing.goalsDiff ?? 0}
                      </td>
                      <td className="py-4 text-center font-bold text-app-gold">
                        {standing.points}
                      </td>
                      <td className="py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            isQualified
                              ? "bg-app-primary/20 text-app-primary"
                              : "bg-app-card-soft text-app-muted"
                          }`}
                        >
                          {translateStandingDescription(standing.description)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="space-y-3 md:hidden">
            {activeGroup.map((standing) => {
              const isQualified =
                standing.description?.includes("Qualification");

              return (
                <div
                  key={standing.team.id}
                  className={`rounded-2xl border p-4 ${
                    isQualified
                      ? "border-app-primary bg-app-primary/10"
                      : "border-app-border bg-app-surface"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-app-text">
                        {standing.rank}
                      </span>

                      <GameTeam
                        name={standing.team.name}
                        logo={standing.team.logo}
                      />
                    </div>

                    <p className="text-xl font-bold text-app-gold">
                      {standing.points}
                    </p>
                  </div>

                  <div className="mt-4 grid grid-cols-4 gap-2 text-center text-xs">
                    <StatItem label="J" value={standing.all?.played ?? 0} />
                    <StatItem label="V" value={standing.all?.win ?? 0} />
                    <StatItem label="E" value={standing.all?.draw ?? 0} />
                    <StatItem label="D" value={standing.all?.lose ?? 0} />
                    <StatItem
                      label="GP"
                      value={standing.all?.goals?.for ?? 0}
                    />
                    <StatItem
                      label="GC"
                      value={standing.all?.goals?.against ?? 0}
                    />
                    <StatItem label="SG" value={standing.goalsDiff ?? 0} />
                    <StatItem label="PTS" value={standing.points} />
                  </div>

                  <div className="mt-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        isQualified
                          ? "bg-app-primary/20 text-app-primary"
                          : "bg-app-card-soft text-app-muted"
                      }`}
                    >
                      {translateStandingDescription(standing.description)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {activeTab === "playoffs" && (
        <div className="space-y-4">
          {roundOrder.map((round) => {
            const games = mockPlayoffs.filter(
              (game) => game.league.round === round,
            );

            if (games.length === 0) {
              return null;
            }

            return (
              <section key={round} className="space-y-3">
                <h2 className="text-lg font-bold text-app-text">
                  {translateRound(round)}
                </h2>

                <div className="grid gap-4 md:grid-cols-2">
                  {games.map((game) => (
                    <PlayoffGameCard key={game.id} game={game} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </PageContainer>
  );
}

function translateStandingDescription(description?: string) {
  if (!description) {
    return "Sem status";
  }

  const translations: Record<string, string> = {
    "Qualification - Round of 32": "Classificado - 16 avos",
    "Possible Best 3rd Place": "Possível melhor 3º colocado",
    Eliminated: "Eliminado",
  };

  return translations[description] ?? description;
}

function StatItem({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl bg-app-card-soft p-2">
      <p className="text-[10px] font-semibold text-app-subtle">{label}</p>
      <p className="mt-1 font-bold text-app-text">{value}</p>
    </div>
  );
}
const roundOrder = [
  "Round of 32",
  "Round of 16",
  "Quarter-finals",
  "Semi-finals",
  "Final",
];

function translateRound(round: string) {
  const translations: Record<string, string> = {
    "Round of 32": "16 avos de final",
    "Round of 16": "Oitavas de final",
    "Quarter-finals": "Quartas de final",
    "Semi-finals": "Semifinais",
    Final: "Final",
  };

  return translations[round] ?? round;
}

function PlayoffGameCard({ game }: { game: Game }) {
  const shouldShowScore = game.status.short !== "NS";
  const hasPenalty =
    game.score?.penalty?.home !== null &&
    game.score?.penalty?.home !== undefined &&
    game.score?.penalty?.away !== null &&
    game.score?.penalty?.away !== undefined;

  return (
    <Card className="space-y-4">
      <div>
        <p className="text-sm font-semibold text-app-text">
          {translateRound(game.league.round)}
        </p>
        <p className={`text-xs ${theme.text.subtle}`}>
          {game.venue.name} • {game.venue.city}
        </p>
      </div>

      <div className="space-y-3">
        <PlayoffTeamRow
          name={game.teams.home.name}
          logo={game.teams.home.logo}
          score={game.goals.home}
          penaltyScore={game.score?.penalty?.home}
          winner={game.teams.home.winner}
          shouldShowScore={shouldShowScore}
          hasPenalty={hasPenalty}
        />

        <PlayoffTeamRow
          name={game.teams.away.name}
          logo={game.teams.away.logo}
          score={game.goals.away}
          penaltyScore={game.score?.penalty?.away}
          winner={game.teams.away.winner}
          shouldShowScore={shouldShowScore}
          hasPenalty={hasPenalty}
        />
      </div>

      {!shouldShowScore && (
        <p className="rounded-xl bg-app-card-soft px-3 py-2 text-center text-xs font-semibold text-app-muted">
          Confronto ainda não iniciado
        </p>
      )}
    </Card>
  );
}

function PlayoffTeamRow({
  name,
  logo,
  score,
  penaltyScore,
  winner,
  shouldShowScore,
  hasPenalty,
}: {
  name: string;
  logo?: string;
  score: number | null;
  penaltyScore?: number | null;
  winner?: boolean | null;
  shouldShowScore: boolean;
  hasPenalty: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between gap-3 rounded-xl border p-3 ${
        winner
          ? "border-app-primary bg-app-primary/10"
          : "border-app-border bg-app-surface"
      }`}
    >
      <GameTeam name={name} logo={logo} />

      <div className="flex items-center gap-2">
        {shouldShowScore ? (
          <span className="text-lg font-bold text-app-text">{score ?? 0}</span>
        ) : (
          <span className="text-sm font-semibold text-app-muted">-</span>
        )}

        {hasPenalty && (
          <span className="text-xs font-semibold text-app-gold">
            ({penaltyScore ?? 0})
          </span>
        )}
      </div>
    </div>
  );
}
