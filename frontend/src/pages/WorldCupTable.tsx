import { useMemo, useState } from "react";

import { PageContainer } from "../components/layout/PageContainer";
import { PageHeader } from "../components/ui/PageHeader";
import { mockPlayoffs } from "../mocks/playoffs.mock";
import { mockStandings } from "../mocks/standings.mock";
import {
  WorldCupTabs,
  type WorldCupTableTab,
} from "../components/worldCupTable/WorldCupTabs";
import { PlayoffRounds } from "../components/worldCupTable/PlayoffRounds";
import { GroupStandings } from "../components/worldCupTable/GroupStandings";

export function WorldCupTable() {
  const [activeTab, setActiveTab] = useState<WorldCupTableTab>("groups");
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const [activePlayoffIndexes, setActivePlayoffIndexes] = useState<
    Record<string, number>
  >({});

  const activeGroup = mockStandings[activeGroupIndex];
  const groupName = activeGroup?.[0]?.group ?? "Grupo";

  const canGoToPreviousGroup = activeGroupIndex > 0;
  const canGoToNextGroup = activeGroupIndex < mockStandings.length - 1;

  const translatedGroupName = useMemo(() => {
    return groupName.replace("Group", "Grupo");
  }, [groupName]);

  function handlePreviousGroup() {
    if (!canGoToPreviousGroup) return;

    setActiveGroupIndex((currentIndex) => currentIndex - 1);
  }

  function handleNextGroup() {
    if (!canGoToNextGroup) return;

    setActiveGroupIndex((currentIndex) => currentIndex + 1);
  }

  function handlePlayoffCarouselChange(
    round: string,
    direction: "previous" | "next",
    gamesCount: number,
  ) {
    setActivePlayoffIndexes((currentIndexes) => {
      const currentIndex = currentIndexes[round] ?? 0;

      const nextIndex =
        direction === "next"
          ? Math.min(currentIndex + 1, gamesCount - 1)
          : Math.max(currentIndex - 1, 0);

      return {
        ...currentIndexes,
        [round]: nextIndex,
      };
    });
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
          groupsCount={mockStandings.length}
          canGoToPreviousGroup={canGoToPreviousGroup}
          canGoToNextGroup={canGoToNextGroup}
          onPreviousGroup={handlePreviousGroup}
          onNextGroup={handleNextGroup}
        />
      )}

      {activeTab === "playoffs" && (
        <PlayoffRounds
          games={mockPlayoffs}
          activeIndexes={activePlayoffIndexes}
          onCarouselChange={handlePlayoffCarouselChange}
        />
      )}
    </PageContainer>
  );
}
