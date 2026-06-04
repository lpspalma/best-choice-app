import { useState } from "react";

import { Card } from "../components/ui/Card";
import { PageHeader } from "../components/ui/PageHeader";
import { theme } from "../styles/theme";

type GamesTab = "today-games" | "all-games";

export function Games() {
  const [activeTab, setActiveTab] = useState<GamesTab>("today-games");

  return (
    <div>
      <PageHeader
        title="Jogos"
        description="Acompanhe os jogos do dia e todos os jogos da Copa."
      />

      <div className="mb-4 grid grid-cols-2 gap-2 md:hidden">
        <button
          type="button"
          onClick={() => setActiveTab("today-games")}
          className={getTabClassName(activeTab === "today-games")}
        >
          Jogos de Hoje
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("all-games")}
          className={getTabClassName(activeTab === "all-games")}
        >
          Todos os Jogos
        </button>
      </div>

      <div className="space-y-4">
        <section
          className={activeTab === "today-games" ? "block" : "hidden md:hidden"}
        >
          <Card>
            <h2 className="mb-2 text-lg font-semibold text-app-text">
              Jogos de Hoje
            </h2>

            <p className={theme.text.subtitle}>
              Conteúdo dos jogos de hoje em construção.
            </p>
          </Card>
        </section>

        <section
          className={activeTab === "all-games" ? "block" : "hidden md:block"}
        >
          <Card>
            <h2 className="mb-2 text-lg font-semibold text-app-text">
              Todos os Jogos
            </h2>

            <p className={theme.text.subtitle}>
              Conteúdo com todos os jogos da Copa em construção.
            </p>
          </Card>
        </section>
      </div>
    </div>
  );
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
