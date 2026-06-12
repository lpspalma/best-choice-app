type GameScoreProps = {
  homeScore: number | null;
  awayScore: number | null;
  showVs?: boolean;
};

export function GameScore({
  homeScore,
  awayScore,
  showVs = false,
}: GameScoreProps) {
  if (showVs) {
    return <p className="text-sm font-semibold text-app-muted">VS</p>;
  }

  return (
    <p className="text-xl font-bold text-app-text">
      {homeScore ?? 0} x {awayScore ?? 0}
    </p>
  );
}
