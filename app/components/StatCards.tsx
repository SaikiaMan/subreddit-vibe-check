import { PositiveIcon, NeutralIcon, NegativeIcon } from "./icons";
import type { SentimentType } from "@/lib/sentiment";

interface StatCardsProps {
  stats: Record<SentimentType, { count: number; percentage: number }>;
}

export function StatCards({ stats }: StatCardsProps) {
  const cards: { type: SentimentType; label: string; icon: typeof PositiveIcon }[] = [
    { type: "positive", label: "Positive", icon: PositiveIcon },
    { type: "neutral", label: "Neutral", icon: NeutralIcon },
    { type: "negative", label: "Negative", icon: NegativeIcon },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {cards.map(({ type, label, icon: Icon }) => {
        const { count, percentage } = stats[type];
        const config = {
          positive: {
            border: "border-green-100",
            bg: "bg-white",
            iconBg: "bg-green-50",
            iconColor: "text-green-600",
            textColor: "text-green-700",
          },
          neutral: {
            border: "border-slate-100",
            bg: "bg-white",
            iconBg: "bg-slate-50",
            iconColor: "text-slate-500",
            textColor: "text-slate-700",
          },
          negative: {
            border: "border-red-100",
            bg: "bg-white",
            iconBg: "bg-red-50",
            iconColor: "text-red-600",
            textColor: "text-red-700",
          },
        };

        const c = config[type];

        return (
          <div
            key={type}
            className={`rounded-2xl border ${c.border} ${c.bg} p-5 shadow-sm`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${c.iconBg} ${c.iconColor}`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-semibold text-slate-600">{label}</h3>
            </div>
            <p
              className={`mt-4 text-3xl font-bold tracking-tight sm:text-4xl ${c.textColor}`}
            >
              {percentage}%
            </p>
            <p className="mt-1 text-sm text-slate-500">{count} posts</p>
          </div>
        );
      })}
    </div>
  );
}
