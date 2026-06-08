import { useMemo, useState } from "react";

import { GameTeam } from "../components/game/GameTeam";
import { PageContainer } from "../components/layout/PageContainer";
import { Card } from "../components/ui/Card";
import { PageHeader } from "../components/ui/PageHeader";
import { mockStandings } from "../mocks/standings.mock";
import { theme } from "../styles/theme";

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
        <button
          type="button"
          onClick={() => setActiveTab("groups")}
          className={`flex-1 rounded-xl px-4 py-2 text-sm font-semibold transition ${
            activeTab === "groups"
              ? "bg-app-primary text-white shadow-glow-green"
              : "text-app-muted hover:bg-app-card-soft hover:text-app-text"
          }`}
        >
          Grupos
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("playoffs")}
          className={`flex-1 rounded-xl px-4 py-2 text-sm font-semibold transition ${
            activeTab === "playoffs"
              ? "bg-app-primary text-white shadow-glow-green"
              : "text-app-muted hover:bg-app-card-soft hover:text-app-text"
          }`}
        >
          Mata-mata
        </button>
      </div>

      {activeTab === "groups" && (
        <Card className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handlePreviousGroup}
              disabled={!canGoToPreviousGroup}
              className={theme.button.secondary}
            >
              Anterior
            </button>

            <div className="text-center">
              <p className="text-lg font-bold text-app-text">
                {translatedGroupName}
              </p>
              <p className={`text-xs ${theme.text.subtle}`}>
                {activeGroupIndex + 1} de {mockStandings.length}
              </p>
            </div>

            <button
              type="button"
              onClick={handleNextGroup}
              disabled={!canGoToNextGroup}
              className={theme.button.secondary}
            >
              Próximo
            </button>
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
        <Card>
          <p className={theme.text.muted}>
            Mata-mata será implementado no próximo substep.
          </p>
        </Card>
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
