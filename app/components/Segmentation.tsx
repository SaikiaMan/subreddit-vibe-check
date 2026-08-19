"use client";

import type { SentimentType } from "@/lib/sentiment";

interface SegmentationProps {
  counts: Record<SentimentType, number>;
  total: number;
}

export function Segmentation({ counts, total }: SegmentationProps) {
  const data = [
    { c1: "Positive", c2: counts.positive, c3: "#22c55e" },
    { c1: "Neutral", c2: counts.neutral, c3: "#a1a0a0" },
    { c1: "Negative", c2: counts.negative, c3: "#ef4444" },
  ];

  return (
    <div className="h-full rounded-lg bg-card p-4">
      <div className="flex items-center justify-between">
        <div className="font-bold text-white">Sentiment Breakdown</div>
      </div>
      <div className="mt-3 text-sm text-gray-400">All analyzed posts</div>
      {data.map(({ c1, c2, c3 }) => {
        const width = total > 0 ? (c2 / total) * 100 : 0;
        return (
          <div className="mt-3 flex items-center" key={c1}>
            <div
              className="h-2 w-2 rounded-full"
              style={{ background: c3 }}
            />
            <div className="ml-2 text-sm" style={{ color: c3 }}>
              {c1}
            </div>
            <div className="flex-grow" />
            <div className="text-sm" style={{ color: c3 }}>
              {c2}
            </div>
            <div className="ml-3 w-24 rounded-sm bg-[#2d2d2d]">
              <div
                className="h-1 rounded-sm"
                style={{ width: `${width}%`, background: c3 }}
              />
            </div>
          </div>
        );
      })}

      <div className="mt-4 flex h-12 w-36 items-center justify-between rounded-xl bg-details px-3">
        <div className="text-sm">Details</div>
        <svg
          className="h-4 w-4 text-gray-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </div>
    </div>
  );
}
