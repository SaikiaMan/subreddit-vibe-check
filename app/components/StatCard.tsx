"use client";

import { useSpring, animated } from "@react-spring/web";
import { PositiveIcon, NeutralIcon, NegativeIcon } from "./icons";
import type { SentimentType } from "@/lib/sentiment";

interface StatCardProps {
  type: SentimentType;
  percentage: number;
  count: number;
}

export function StatCard({ type, percentage, count }: StatCardProps) {
  const config = {
    positive: {
      label: "Positive",
      icon: PositiveIcon,
      color: "#22c55e",
    },
    neutral: {
      label: "Neutral",
      icon: NeutralIcon,
      color: "#a1a0a0",
    },
    negative: {
      label: "Negative",
      icon: NegativeIcon,
      color: "#ef4444",
    },
  };

  const c = config[type];
  const Icon = c.icon;

  const { number } = useSpring({
    number: percentage,
    from: { number: 0 },
  });

  return (
    <div className="h-32 rounded-lg bg-card p-4">
      <div className="flex items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl icon-background"
          style={{ color: c.color }}
        >
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="text-sm font-semibold text-gray-400">{c.label}</h3>
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <animated.div className="text-3xl font-bold text-white sm:text-4xl">
          {number.to((n) => `${Math.round(n)}%`)}
        </animated.div>
        <span className="text-sm text-gray-500">{count} posts</span>
      </div>
    </div>
  );
}
