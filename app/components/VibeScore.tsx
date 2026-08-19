interface VibeScoreProps {
  score: number;
}

export function VibeScore({ score }: VibeScoreProps) {
  const rounded = score.toFixed(2);
  const isPositive = score > 0.1;
  const isNegative = score < -0.1;

  let label = "Mostly neutral";
  if (isPositive) label = "Mostly positive";
  if (isNegative) label = "Mostly negative";

  const sign = score > 0 ? "+" : "";
  const colorClass = isPositive
    ? "text-green-700"
    : isNegative
      ? "text-red-700"
      : "text-slate-700";

  return (
    <section className="rounded-2xl border border-orange-100 bg-orange-50 p-6">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-orange-800">
        Vibe Score
      </h3>
      <p className={`mt-2 text-4xl font-bold tracking-tight ${colorClass}`}>
        {sign}
        {rounded}
      </p>
      <p className="mt-1 text-sm font-medium text-orange-800">{label}</p>
      <p className="mt-3 text-xs text-orange-700/80">
        Normalized aggregate sentiment score from all analyzed posts, ranging from
        -1 to +1.
      </p>
    </section>
  );
}
