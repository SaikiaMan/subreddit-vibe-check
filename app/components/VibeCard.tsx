import type { SentimentType } from "@/lib/sentiment";

interface VibeCardProps {
  overallVibe: SentimentType;
  total: number;
}

export function VibeCard({ overallVibe, total }: VibeCardProps) {
  const config = {
    positive: {
      emoji: "😊",
      label: "Positive",
      description:
        "The community is showing a generally positive sentiment across the latest hot posts.",
      borderColor: "border-green-200",
      bgColor: "bg-green-50",
      textColor: "text-green-700",
      iconBg: "bg-green-100",
    },
    neutral: {
      emoji: "😐",
      label: "Neutral",
      description:
        "The community has a balanced mix of sentiments across the latest hot posts.",
      borderColor: "border-slate-200",
      bgColor: "bg-slate-50",
      textColor: "text-slate-700",
      iconBg: "bg-slate-100",
    },
    negative: {
      emoji: "😞",
      label: "Negative",
      description:
        "The community is showing a generally negative sentiment across the latest hot posts.",
      borderColor: "border-red-200",
      bgColor: "bg-red-50",
      textColor: "text-red-700",
      iconBg: "bg-red-100",
    },
  };

  const c = config[overallVibe];

  return (
    <section
      className={`rounded-2xl border ${c.borderColor} ${c.bgColor} p-6 sm:p-8`}
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <div
          className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl ${c.iconBg} text-3xl sm:h-20 sm:w-20 sm:text-4xl`}
          aria-hidden="true"
        >
          {c.emoji}
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Community Vibe
          </p>
          <h2
            className={`mt-1 text-3xl font-bold tracking-tight sm:text-4xl ${c.textColor}`}
          >
            {c.label}
          </h2>
          <p className="mt-1 max-w-xl text-sm text-slate-600">
            {c.description}
          </p>
          <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
            {total} posts analyzed
          </p>
        </div>
      </div>
    </section>
  );
}
