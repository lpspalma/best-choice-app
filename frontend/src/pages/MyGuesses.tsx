import { useState } from "react";

import { Card } from "../components/ui/Card";
import { PageHeader } from "../components/ui/PageHeader";
import { theme } from "../styles/theme";

type GuessTab = "my-guesses" | "user-guesses";

export function MyGuesses() {
  const [activeTab, setActiveTab] = useState<GuessTab>("my-guesses");

  return (
    <div>
      <PageHeader
        title="Meus Palpites"
        description="Acompanhe e edite seus palpites da Copa."
      />

      <div className="mb-4 grid grid-cols-2 gap-2 md:hidden">
        <button
          type="button"
          onClick={() => setActiveTab("my-guesses")}
          className={getTabClassName(activeTab === "my-guesses")}
        >
          Meus Palpites
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("user-guesses")}
          className={getTabClassName(activeTab === "user-guesses")}
        >
          Usuários
        </button>
      </div>

      <div className="space-y-4">
        <section
          className={activeTab === "my-guesses" ? "block" : "hidden md:block"}
        >
          <Card>
            <h2 className="mb-2 text-lg font-semibold text-app-text">
              Meus Palpites
            </h2>

            <p className={theme.text.subtitle}>
              Conteúdo dos seus palpites em construção.
            </p>
          </Card>
        </section>

        <section
          className={
            activeTab === "user-guesses" ? "block" : "hidden md:hidden"
          }
        >
          <Card>
            <h2 className="mb-2 text-lg font-semibold text-app-text">
              Palpites dos Usuários
            </h2>

            <p className={theme.text.subtitle}>
              Conteúdo dos palpites dos outros participantes em construção.
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
