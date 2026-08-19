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
        "This community is feeling upbeat and optimistic right now.",
      color: "#22c55e",
    },
    neutral: {
      emoji: "😐",
      label: "Neutral",
      description:
        "This community has a balanced mix of sentiments right now.",
      color: "#a1a0a0",
    },
    negative: {
      emoji: "😞",
      label: "Negative",
      description:
        "This community is feeling frustrated or concerned right now.",
      color: "#ef4444",
    },
  };

  const c = config[overallVibe];

  return (
    <div className="rounded-lg bg-card p-5">
      <div className="flex items-start gap-4">
        <div
          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-4xl"
          style={{ backgroundColor: "#2d2d2d" }}
          aria-hidden="true"
        >
          {c.emoji}
        </div>
        <div>
          <p
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: c.color }}
          >
            Community Vibe
          </p>
          <h2 className="mt-1 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {c.label}
          </h2>
          <p className="mt-1 max-w-xl text-sm text-gray-400">
            {c.description}
          </p>
          <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
            {total} hot posts analyzed
          </p>
        </div>
      </div>
    </div>
  );
}
