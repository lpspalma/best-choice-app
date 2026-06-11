type StatItemProps = {
  label: string;
  value: number;
};

export function StatItem({ label, value }: StatItemProps) {
  return (
    <div className="rounded-xl bg-app-card-soft p-2">
      <p className="text-[10px] font-semibold text-app-subtle">{label}</p>
      <p className="mt-1 font-bold text-app-text">{value}</p>
    </div>
  );
}
