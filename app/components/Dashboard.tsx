import type { RedditPost } from "@/lib/reddit";
import type { SentimentResult, SentimentType } from "@/lib/sentiment";
import SubredditSearch from "../SubredditSearch";
import { DemoBadge } from "./DemoBadge";
import { DistributionBar } from "./DistributionBar";
import { Header } from "./Header";
import { PostList } from "./PostList";
import { StatCards } from "./StatCards";
import { VibeCard } from "./VibeCard";
import { VibeScore } from "./VibeScore";

interface DashboardProps {
  subreddit: string;
  analyzedPosts: Array<RedditPost & { sentiment: SentimentResult }>;
  stats: {
    positive: { count: number; percentage: number };
    neutral: { count: number; percentage: number };
    negative: { count: number; percentage: number };
    total: number;
    overallVibe: SentimentType;
    vibeScore: number;
  };
}

export function Dashboard({ subreddit, analyzedPosts, stats }: DashboardProps) {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <DemoBadge />
          <p className="text-sm text-slate-500">
            Analyzing <span className="font-semibold text-slate-900">r/{subreddit}</span>
          </p>
        </div>

        <Header />

        <section className="mb-8">
          <SubredditSearch initialSubreddit={subreddit} />
        </section>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <VibeCard overallVibe={stats.overallVibe} total={stats.total} />
          </div>
          <div>
            <VibeScore score={stats.vibeScore} />
          </div>
        </div>

        <div className="mt-6">
          <StatCards
            stats={{
              positive: stats.positive,
              neutral: stats.neutral,
              negative: stats.negative,
            }}
          />
        </div>

        <div className="mt-6">
          <DistributionBar
            stats={{
              positive: stats.positive,
              neutral: stats.neutral,
              negative: stats.negative,
            }}
          />
        </div>

        <div className="mt-6">
          <PostList posts={analyzedPosts} />
        </div>
      </div>
    </main>
  );
}
