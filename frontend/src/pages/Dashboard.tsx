import { useEffect, useState } from "react";

import { Card } from "../components/ui/Card";
import { PageHeader } from "../components/ui/PageHeader";
import { PageContainer } from "../components/layout/PageContainer";
import { getDashboardData } from "../services/dashboard.service";
import { theme } from "../styles/theme";
import type { DashboardData } from "../types/dashboard";
import { Link } from "react-router-dom";
import { LoadingState } from "../components/ui/LoadingState";
import { DashboardSection } from "../components/dashboard/DashboardSection";
import { EmptyState } from "../components/ui/EmptyState";
import { GameTeam } from "../components/game/GameTeam";
import { GameScore } from "../components/game/GameScore";
import { RankingRow } from "../components/ranking/RankingRow";
import { getPositionLabel } from "../utils/ranking";
import { GameCard } from "../components/game/GameCard";

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

        <LoadingState message="Carregando dashboard..." />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader title="Dashboard" description="Resumo geral do seu bolão" />
      <section className="grid gap-3 md:grid-cols-4 md:gap-4">
        <Card>
          <p className={`text-xs md:text-sm ${theme.text.subtle}`}>Pontuação</p>

          <p className="mt-1 text-2xl font-bold text-app-text md:mt-2 md:text-3xl">
            {dashboardData.summary.points}
          </p>
        </Card>

        <Card>
          <p className={`text-xs md:text-sm ${theme.text.subtle}`}>
            Minha posição
          </p>

          <p className="mt-1 text-2xl font-bold text-app-text md:mt-2 md:text-3xl">
            #{dashboardData.summary.currentPosition}
          </p>
        </Card>

        <Card>
          <p className={`text-xs md:text-sm ${theme.text.subtle}`}>
            Palpites feitos
          </p>

          <p className="mt-1 text-2xl font-bold text-app-text md:mt-2 md:text-3xl">
            {dashboardData.summary.guessesMade}
          </p>
        </Card>

        <Card>
          <p className={`text-xs md:text-sm ${theme.text.subtle}`}>Jogadores</p>

          <p className="mt-1 text-2xl font-bold text-app-text md:mt-2 md:text-3xl">
            {dashboardData.summary.totalPlayers}
          </p>
        </Card>
      </section>
      <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <DashboardSection
          title="Próximos Jogos"
          description="Próximas partidas da rodada"
          action={
            <Link
              to="/games"
              className="text-sm font-medium text-app-primary transition hover:text-white hover:underline"
            >
              Jogos
            </Link>
          }
        >
          {dashboardData.nextGames.length === 0 ? (
            <EmptyState
              title="Nenhum jogo disponível"
              description="Ainda não existem próximos jogos para exibir."
            />
          ) : (
            <div className="space-y-3">
              {dashboardData.nextGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          )}
        </DashboardSection>

        <DashboardSection
          title="Ranking Rápido"
          description="Top jogadores do bolão"
        >
          {dashboardData.quickRanking.length === 0 ? (
            <EmptyState
              title="Ranking ainda não disponível."
              description="Não há pontuações para exibir."
            />
          ) : (
            <div className="space-y-3">
              {dashboardData.quickRanking.map((user) => (
                <RankingRow
                  key={user.id}
                  user={user}
                  isLeader={user.position === 1}
                  isCurrentUser={false}
                  positionLabel={getPositionLabel(user.position)}
                />
              ))}
            </div>
          )}
        </DashboardSection>
      </section>
      <section className="border-t border-app-border pt-6">
        <DashboardSection
          title="Meus Últimos Palpites"
          description="Seus palpites mais recentes"
          action={
            <Link
              to="/my-guesses"
              className="text-sm font-medium text-app-primary transition hover:text-white hover:underline"
            >
              Palpites
            </Link>
          }
        >
          {dashboardData.latestGuesses.length === 0 ? (
            <EmptyState
              title="Nenhum palpite encontrado"
              description="Você ainda não realizou palpites recentes."
            />
          ) : (
            <div className="space-y-3">
              {dashboardData.latestGuesses.map((guess) => (
                <div
                  key={guess.id}
                  className="rounded-xl border border-app-border bg-app-surface px-3 py-2"
                >
                  <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                    <GameTeam
                      name={guess.game.teams.home.name}
                      logo={guess.game.teams.home.logo}
                    />

                    <div className="rounded-md bg-app-card-soft px-2 py-1">
                      <GameScore
                        homeScore={guess.homeGuess}
                        awayScore={guess.awayGuess}
                      />
                    </div>

                    <GameTeam
                      name={guess.game.teams.away.name}
                      logo={guess.game.teams.away.logo}
                      alignRight
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </DashboardSection>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <DashboardSection
          title="Resumo da Rodada"
          description="Seu progresso até agora"
        >
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
        </DashboardSection>

        <DashboardSection
          title="Jogos Ao Vivo"
          description="Partidas em andamento"
        >
          <p className={theme.text.muted}>Nenhum jogo ao vivo no momento.</p>
        </DashboardSection>
      </section>
    </PageContainer>
  );
}
