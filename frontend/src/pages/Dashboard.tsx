import { useEffect, useState } from "react";

import { Card } from "../components/ui/Card";
import { PageHeader } from "../components/ui/PageHeader";
import { PageContainer } from "../components/layout/PageContainer";
import { getDashboardData } from "../services/dashboard.service";
import { theme } from "../styles/theme";
import type { DashboardData } from "../types/dashboard";
import { Link } from "react-router-dom";
import { formatGameDate, formatGameTime } from "../utils/date";

export function Dashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null,
  );

  useEffect(() => {
    async function loadDashboardData() {
      const data = await getDashboardData();
      setDashboardData(data);
    }

    loadDashboardData();
  }, []);

  if (!dashboardData) {
    return (
      <PageContainer>
        <PageHeader title="Dashboard" description="Resumo geral do seu bolão" />

        <Card>
          <p className={theme.text.muted}>Carregando dashboard...</p>
        </Card>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader title="Dashboard" description="Resumo geral do seu bolão" />

      <section className="grid gap-4 md:grid-cols-4">
        <Card>
          <p className={theme.text.subtle}>Pontuação</p>
          <p className="mt-2 text-3xl font-bold text-app-text">
            {dashboardData.summary.points}
          </p>
        </Card>

        <Card>
          <p className={theme.text.subtle}>Minha posição</p>
          <p className="mt-2 text-3xl font-bold text-app-text">
            #{dashboardData.summary.currentPosition}
          </p>
        </Card>

        <Card>
          <p className={theme.text.subtle}>Palpites feitos</p>
          <p className="mt-2 text-3xl font-bold text-app-text">
            {dashboardData.summary.guessesMade}
          </p>
        </Card>

        <Card>
          <p className={theme.text.subtle}>Jogadores</p>
          <p className="mt-2 text-3xl font-bold text-app-text">
            {dashboardData.summary.totalPlayers}
          </p>
        </Card>
      </section>
      <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Card className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-app-text">
                Próximos Jogos
              </h2>

              <p className={theme.text.subtitle}>Próximas partidas da rodada</p>
            </div>

            <Link
              to="/games"
              className="text-sm font-medium text-app-primary hover:underline"
            >
              Jogos
            </Link>
          </div>

          <div className="space-y-3">
            {dashboardData.nextGames.map((game) => (
              <div
                key={game.id}
                className="rounded-xl border border-app-border bg-app-surface p-3 md:p-4"
              >
                <p className="mb-2 text-center text-xs text-app-subtle">
                  {formatGameDate(game.date)} às {formatGameTime(game.date)}
                </p>

                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 md:gap-3">
                  <div className="flex min-w-0 items-center gap-2">
                    <img
                      src={game.teams.home.logo}
                      alt={game.teams.home.name}
                      className="h-7 w-7 shrink-0 md:h-8 md:w-8"
                    />

                    <span className="truncate text-sm font-medium text-app-text md:text-base">
                      {game.teams.home.name}
                    </span>
                  </div>

                  <span className="text-xs text-app-muted md:text-sm">vs</span>

                  <div className="flex min-w-0 items-center justify-end gap-2">
                    <span className="truncate text-right text-sm font-medium text-app-text md:text-base">
                      {game.teams.away.name}
                    </span>

                    <img
                      src={game.teams.away.logo}
                      alt={game.teams.away.name}
                      className="h-7 w-7 shrink-0 md:h-8 md:w-8"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-app-text">
              Ranking Rápido
            </h2>

            <p className={theme.text.subtitle}>Top jogadores do bolão</p>
          </div>

          <div className="space-y-3">
            {dashboardData.quickRanking.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between rounded-xl border border-app-border bg-app-surface p-3"
              >
                <div>
                  <p className="font-medium text-app-text">
                    #{user.position} {user.name}
                  </p>

                  <p className="text-sm text-app-muted">
                    {user.exactScores} placares exatos
                  </p>
                </div>

                <p className="font-bold text-app-gold">{user.points} pts</p>
              </div>
            ))}
          </div>
        </Card>
      </section>
      <section className=" border-t border-app-border">
        <Card className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-app-text">
                Meus Últimos Palpites
              </h2>

              <p className={theme.text.subtitle}>Seus palpites mais recentes</p>
            </div>

            <Link
              to="/my-guesses"
              className="text-sm font-medium text-app-primary hover:underline"
            >
              Palpites
            </Link>
          </div>

          <div className="space-y-3">
            {dashboardData.latestGuesses.map((guess) => (
              <div
                key={guess.id}
                className="rounded-xl border border-app-border bg-app-surface px-3 py-2"
              >
                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                  <div className="flex min-w-0 items-center gap-1.5">
                    <img
                      src={guess.game.teams.home.logo}
                      alt={guess.game.teams.home.name}
                      className="h-5 w-5 shrink-0 md:h-6 md:w-6"
                    />

                    <span className="truncate text-xs font-medium text-app-text md:text-sm">
                      {guess.game.teams.home.name}
                    </span>
                  </div>

                  <div className="flex items-center justify-center gap-1 rounded-md bg-app-card-soft px-2 py-1 text-xs font-bold text-app-text md:text-sm">
                    <span>{guess.homeGuess}</span>
                    <span>x</span>
                    <span>{guess.awayGuess}</span>
                  </div>

                  <div className="flex min-w-0 items-center justify-end gap-1.5">
                    <span className="truncate text-right text-xs font-medium text-app-text md:text-sm">
                      {guess.game.teams.away.name}
                    </span>

                    <img
                      src={guess.game.teams.away.logo}
                      alt={guess.game.teams.away.name}
                      className="h-5 w-5 shrink-0 md:h-6 md:w-6"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>
      <section className="grid gap-6 md:grid-cols-2">
        <Card className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-app-text">
              Resumo da Rodada
            </h2>

            <p className={theme.text.subtitle}>Seu progresso até agora</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-xl bg-app-surface p-4">
              <span className={theme.text.muted}>Jogos disponíveis</span>

              <span className="font-bold text-app-text">
                {dashboardData.summary.totalGames}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-app-surface p-4">
              <span className={theme.text.muted}>Palpites realizados</span>

              <span className="font-bold text-app-primary">
                {dashboardData.summary.guessesMade}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-app-surface p-4">
              <span className={theme.text.muted}>Palpites pendentes</span>

              <span className="font-bold text-app-gold">
                {dashboardData.summary.totalGames -
                  dashboardData.summary.guessesMade}
              </span>
            </div>
          </div>
        </Card>

        <Card className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-app-text">
              Jogos Ao Vivo
            </h2>

            <p className={theme.text.subtitle}>Partidas em andamento</p>
          </div>

          <div className="rounded-xl border border-app-border bg-app-surface p-4">
            <p className={theme.text.muted}>Nenhum jogo ao vivo no momento.</p>
          </div>
        </Card>
      </section>
    </PageContainer>
  );
}
