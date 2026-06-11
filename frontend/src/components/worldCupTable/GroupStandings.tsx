import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import type { StandingGroup } from "../../types/standing";
import { theme } from "../../styles/theme";
import { StandingsTable } from "./StandingsTable";
import { MobileStandingCard } from "./MobileStandingCard";

type GroupStandingsProps = {
  group: StandingGroup;
  groupName: string;
  groupIndex: number;
  groupsCount: number;
  canGoToPreviousGroup: boolean;
  canGoToNextGroup: boolean;
  onPreviousGroup: () => void;
  onNextGroup: () => void;
};

export function GroupStandings({
  group,
  groupName,
  groupIndex,
  groupsCount,
  canGoToPreviousGroup,
  canGoToNextGroup,
  onPreviousGroup,
  onNextGroup,
}: GroupStandingsProps) {
  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <Button
          type="button"
          variant="secondary"
          onClick={onPreviousGroup}
          disabled={!canGoToPreviousGroup}
          className="flex items-center justify-center gap-2 px-3 md:px-4"
        >
          <ChevronLeft size={18} />
          <span className="hidden md:inline">Anterior</span>
        </Button>

        <div className="text-center">
          <p className="text-lg font-bold text-app-text">{groupName}</p>

          <p className={`text-xs ${theme.text.subtle}`}>
            {groupIndex + 1} de {groupsCount}
          </p>
        </div>

        <Button
          type="button"
          variant="secondary"
          onClick={onNextGroup}
          disabled={!canGoToNextGroup}
          className="flex items-center justify-center gap-2 px-3 md:px-4"
        >
          <span className="hidden md:inline">Próximo</span>
          <ChevronRight size={18} />
        </Button>
      </div>

      <StandingsTable group={group} />

      <div className="space-y-3 md:hidden">
        {group.map((standing) => (
          <MobileStandingCard key={standing.team.id} standing={standing} />
        ))}
      </div>
    </Card>
  );
}
