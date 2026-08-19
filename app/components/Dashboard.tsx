"use client";

import { useState } from "react";
import type { RedditPost } from "@/lib/reddit";
import type { SentimentResult, SentimentType } from "@/lib/sentiment";
import { Sidebar } from "./Sidebar";
import { DashboardHeader } from "./DashboardHeader";
import { StatCard } from "./StatCard";
import { VibeCard } from "./VibeCard";
import { Segmentation } from "./Segmentation";
import { SentimentChart } from "./SentimentChart";
import { PostList } from "./PostList";

interface DashboardProps {
  subreddit: string;
  analyzedPosts: Array<RedditPost & { sentiment: SentimentResult }>;
  stats: {
    positive: number;
    neutral: number;
    negative: number;
    total: number;
    positivePercentage: number;
    neutralPercentage: number;
    negativePercentage: number;
    overallVibe: SentimentType;
  };
}

export function Dashboard({ subreddit, analyzedPosts, stats }: DashboardProps) {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar
        showSidebar={showSidebar}
        onSidebarHide={() => setShowSidebar(false)}
      />
      <div className="flex w-full">
        <div className="hidden h-screen w-20 flex-shrink-0 sm:block xl:w-60">
          .
        </div>
        <div className="flex h-screen flex-grow flex-wrap content-start overflow-auto overflow-x-hidden p-2">
          <div className="w-full p-2 sm:flex sm:items-end">
            <DashboardHeader
              initialSubreddit={subreddit}
              onSidebarShow={() => setShowSidebar(true)}
            />
          </div>

          <div className="w-full p-2 lg:w-1/3">
            <VibeCard overallVibe={stats.overallVibe} total={stats.total} />
          </div>

          <div className="w-full p-2 lg:w-1/3">
            <StatCard
              type="positive"
              percentage={stats.positivePercentage}
              count={stats.positive}
            />
          </div>

          <div className="w-full p-2 lg:w-1/3">
            <StatCard
              type="neutral"
              percentage={stats.neutralPercentage}
              count={stats.neutral}
            />
          </div>

          <div className="w-full p-2 lg:w-2/3">
            <div className="h-60 rounded-lg bg-card sm:h-80">
              <SentimentChart />
            </div>
          </div>

          <div className="w-full p-2 lg:w-1/3">
            <Segmentation
              counts={{
                positive: stats.positive,
                neutral: stats.neutral,
                negative: stats.negative,
              }}
              total={stats.total}
            />
          </div>

          <div className="w-full p-2 lg:w-1/3">
            <StatCard
              type="negative"
              percentage={stats.negativePercentage}
              count={stats.negative}
            />
          </div>

          <div className="w-full p-2 lg:w-2/3">
            <PostList posts={analyzedPosts} />
          </div>
        </div>
      </div>
    </div>
  );
}
