import { useEffect, useMemo, useState } from "react";

import { PageContainer } from "../components/layout/PageContainer";
import { PageHeader } from "../components/ui/PageHeader";
import { mockPlayoffs } from "../mocks/playoffs.mock";
import {
  WorldCupTabs,
  type WorldCupTableTab,
} from "../components/worldCupTable/WorldCupTabs";
import { PlayoffRounds } from "../components/worldCupTable/PlayoffRounds";
import { GroupStandings } from "../components/worldCupTable/GroupStandings";
import type { StandingGroup } from "../types/standing";
import { getWorldCupStandings } from "../services/worldCupService";
import { LoadingState } from "../components/ui/LoadingState";
import { EmptyState } from "../components/ui/EmptyState";

export function WorldCupTable() {
  const [standings, setStandings] = useState<StandingGroup[]>([]);
  const [activeTab, setActiveTab] = useState<WorldCupTableTab>("groups");
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);

  const [isLoadingStandings, setIsLoadingStandings] = useState(true);
  const [standingsError, setStandingsError] = useState("");

  const activeGroup = standings[activeGroupIndex];
  const groupName = activeGroup?.[0]?.group ?? "Grupo";

  const canGoToPreviousGroup = activeGroupIndex > 0;
  const canGoToNextGroup = activeGroupIndex < standings.length - 1;

  const translatedGroupName = useMemo(() => {
    return groupName.replace("Group", "Grupo");
  }, [groupName]);

  const [activePlayoffRoundIndex, setActivePlayoffRoundIndex] = useState(0);

  function handlePreviousGroup() {
    if (!canGoToPreviousGroup) return;

    setActiveGroupIndex((currentIndex) => currentIndex - 1);
  }

  function handleNextGroup() {
    if (!canGoToNextGroup) return;

    setActiveGroupIndex((currentIndex) => currentIndex + 1);
  }

  useEffect(() => {
    async function loadStandings() {
      try {
        setIsLoadingStandings(true);
        setStandingsError("");

        const data = await getWorldCupStandings();

        setStandings(data);
      } catch {
        setStandingsError("Não foi possível carregar a classificação.");
      } finally {
        setIsLoadingStandings(false);
      }
    }

    loadStandings();
  }, []);

  if (isLoadingStandings) {
    return (
      <PageContainer>
        <LoadingState />
      </PageContainer>
    );
  }

  if (standingsError) {
    return (
      <PageContainer>
        <EmptyState
          title="Erro ao carregar classificação"
          description={standingsError}
        />
      </PageContainer>
    );
  }

  if (standings.length === 0) {
    return (
      <PageContainer>
        <EmptyState
          title="Nenhuma classificação encontrada"
          description="A classificação da Copa ainda não está disponível."
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader
        title="Tabela da Copa"
        description="Acompanhe grupos, classificação e fases da competição."
      />

      <WorldCupTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "groups" && (
        <GroupStandings
          group={activeGroup}
          groupName={translatedGroupName}
          groupIndex={activeGroupIndex}
          groupsCount={standings.length}
          canGoToPreviousGroup={canGoToPreviousGroup}
          canGoToNextGroup={canGoToNextGroup}
          onPreviousGroup={handlePreviousGroup}
          onNextGroup={handleNextGroup}
        />
      )}

      {activeTab === "playoffs" && (
        <PlayoffRounds
          games={mockPlayoffs}
          activeRoundIndex={activePlayoffRoundIndex}
          onRoundChange={setActivePlayoffRoundIndex}
        />
      )}
    </PageContainer>
  );
}
