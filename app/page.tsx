import { fetchSubredditPosts } from "@/lib/redditData";
import { analyzeSentiment, type SentimentType } from "@/lib/sentiment";
import { Dashboard } from "./components/Dashboard";
import { ErrorState } from "./components/ErrorState";

interface HomeProps {
  searchParams: Promise<{
    subreddit?: string;
  }>;
}

function computeVibeScore(analyzedPosts: { sentiment: { score: number } }[]): number {
  if (analyzedPosts.length === 0) return 0;

  const maxPossible = analyzedPosts.length * 5;
  const sum = analyzedPosts.reduce(
    (acc, post) => acc + post.sentiment.score,
    0,
  );

  return Math.max(-1, Math.min(1, sum / maxPossible));
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const subreddit = params.subreddit?.trim() || "programming";

  let posts: Awaited<ReturnType<typeof fetchSubredditPosts>>;

  try {
    posts = await fetchSubredditPosts(subreddit);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong.";
    return (
      <ErrorState
        title="Something went wrong while loading the subreddit."
        message={message}
      />
    );
  }

  if (posts.length === 0) {
    return (
      <ErrorState
        title="No posts available to analyze."
        message="We couldn't find posts for this subreddit."
      />
    );
  }

  const analyzedPosts = posts.map((post) => ({
    ...post,
    sentiment: analyzeSentiment(post.title),
  }));

  const positive = analyzedPosts.filter(
    (post) => post.sentiment.type === "positive",
  ).length;

  const neutral = analyzedPosts.filter(
    (post) => post.sentiment.type === "neutral",
  ).length;

  const negative = analyzedPosts.filter(
    (post) => post.sentiment.type === "negative",
  ).length;

  const total = analyzedPosts.length;

  const positivePercentage = Math.round((positive / total) * 100);
  const neutralPercentage = Math.round((neutral / total) * 100);
  const negativePercentage = Math.round((negative / total) * 100);

  let overallVibe: SentimentType = "neutral";

  if (positive > negative) {
    overallVibe = "positive";
  } else if (negative > positive) {
    overallVibe = "negative";
  }

  return (
    <Dashboard
      subreddit={subreddit}
      analyzedPosts={analyzedPosts}
      stats={{
        positive: { count: positive, percentage: positivePercentage },
        neutral: { count: neutral, percentage: neutralPercentage },
        negative: { count: negative, percentage: negativePercentage },
        total,
        overallVibe,
        vibeScore: computeVibeScore(analyzedPosts),
      }}
    />
  );
}
