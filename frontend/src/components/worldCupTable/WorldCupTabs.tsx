import { Button } from "../ui/Button";

export type WorldCupTableTab = "groups" | "playoffs";

type WorldCupTabsProps = {
  activeTab: WorldCupTableTab;
  onTabChange: (tab: WorldCupTableTab) => void;
};

export function WorldCupTabs({ activeTab, onTabChange }: WorldCupTabsProps) {
  return (
    <div className="flex rounded-2xl border border-app-border bg-app-surface p-1">
      <Button
        type="button"
        variant={activeTab === "groups" ? "primary" : "ghost"}
        onClick={() => onTabChange("groups")}
        className="flex-1"
      >
        Grupos
      </Button>

      <Button
        type="button"
        variant={activeTab === "playoffs" ? "primary" : "ghost"}
        onClick={() => onTabChange("playoffs")}
        className="flex-1"
      >
        Mata-mata
      </Button>
    </div>
  );
}
