import { fetchSubredditPosts } from "@/lib/redditData";
import { analyzeSentiment, type SentimentType } from "@/lib/sentiment";
import { Dashboard } from "./components/Dashboard";

interface HomeProps {
  searchParams: Promise<{
    subreddit?: string;
  }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const subreddit = params.subreddit?.trim() || "programming";

  const posts = await fetchSubredditPosts(subreddit);

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
        positive,
        neutral,
        negative,
        total,
        positivePercentage,
        neutralPercentage,
        negativePercentage,
        overallVibe,
      }}
    />
  );
}
