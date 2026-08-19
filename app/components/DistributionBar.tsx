import type { SentimentType } from "@/lib/sentiment";

interface DistributionBarProps {
  stats: Record<SentimentType, { count: number; percentage: number }>;
}

export function DistributionBar({ stats }: DistributionBarProps) {
  return (
    <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
        Sentiment Distribution
      </h3>
      <div className="flex h-4 overflow-hidden rounded-full bg-slate-100">
        <div
          className="bg-green-500 transition-all"
          style={{ width: `${stats.positive.percentage}%` }}
          aria-label={`Positive ${stats.positive.percentage}%`}
        />
        <div
          className="bg-slate-400 transition-all"
          style={{ width: `${stats.neutral.percentage}%` }}
          aria-label={`Neutral ${stats.neutral.percentage}%`}
        />
        <div
          className="bg-red-500 transition-all"
          style={{ width: `${stats.negative.percentage}%` }}
          aria-label={`Negative ${stats.negative.percentage}%`}
        />
      </div>
      <div className="mt-3 flex flex-wrap justify-between gap-2 text-sm font-medium text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-green-500" aria-hidden="true" />
          Positive {stats.positive.percentage}%
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-slate-400" aria-hidden="true" />
          Neutral {stats.neutral.percentage}%
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-500" aria-hidden="true" />
          Negative {stats.negative.percentage}%
        </span>
      </div>
    </section>
  );
}
