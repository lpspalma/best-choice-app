import { PageContainer } from "../components/layout/PageContainer";
import { RankingRow } from "../components/ranking/RankingRow";
import { Card } from "../components/ui/Card";
import { EmptyState } from "../components/ui/EmptyState";
import { PageHeader } from "../components/ui/PageHeader";
import { mockRanking } from "../mocks/ranking.mock";
import { theme } from "../styles/theme";

function getPositionLabel(position: number) {
  if (position === 1) return "🥇";
  if (position === 2) return "🥈";
  if (position === 3) return "🥉";

  return `#${position}`;
}

export function Ranking() {
  const ranking = mockRanking;
  const leader = ranking[0];
  const totalParticipants = ranking.length;
  const currentUserId = "user-3";
  const currentUser = ranking.find((user) => user.id === currentUserId);

  if (ranking.length === 0) {
    return (
      <PageContainer>
        <PageHeader
          title="Ranking"
          description="Acompanhe a pontuação dos participantes."
        />

        <EmptyState
          title="Nenhum participante no ranking"
          description="O ranking será exibido quando os participantes começarem a pontuar."
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader
        title="Ranking"
        description="Acompanhe a pontuação dos participantes."
      />

      <section className="grid gap-4 md:grid-cols-3">
        {currentUser && (
          <Card>
            <p className={theme.text.subtle}>Minha posição</p>

            <p className="mt-2 text-2xl font-bold text-app-text">
              {getPositionLabel(currentUser.position)}
            </p>

            <p className={`mt-1 text-sm ${theme.text.primary}`}>
              {currentUser.points} pontos
            </p>
          </Card>
        )}
        <Card>
          <p className={theme.text.subtle}>Líder atual</p>
          <p className="mt-2 text-2xl font-bold text-app-text">{leader.name}</p>
          <p className={`mt-1 text-sm ${theme.text.gold}`}>
            {leader.points} pontos
          </p>
        </Card>

        <Card>
          <p className={theme.text.subtle}>Participantes</p>
          <p className="mt-2 text-2xl font-bold text-app-text">
            {totalParticipants}
          </p>
          <p className={`mt-1 text-sm ${theme.text.muted}`}>
            Pessoas competindo no bolão
          </p>
        </Card>
      </section>

      <Card className="mt-6">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-app-text">
            Classificação geral
          </h2>
          <p className={`mt-1 text-sm ${theme.text.muted}`}>
            Pontuação acumulada dos participantes
          </p>
        </div>

        <div className="hidden grid-cols-[80px_1fr_120px] gap-4 px-4 pb-2 text-sm font-semibold text-app-muted md:grid">
          <span>Posição</span>
          <span>Participante</span>
          <span className="text-right">Pontos</span>
        </div>
        <div className="space-y-3">
          {ranking.map((user) => {
            const isLeader = user.position === 1;
            const isCurrentUser = user.id === currentUserId;

            return (
              <RankingRow
                key={user.id}
                user={user}
                isLeader={isLeader}
                isCurrentUser={isCurrentUser}
                positionLabel={getPositionLabel(user.position)}
              />
            );
          })}
        </div>
      </Card>
    </PageContainer>
  );
}
