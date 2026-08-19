import type { RedditPost } from "@/lib/reddit";
import type { SentimentResult, SentimentType } from "@/lib/sentiment";

interface PostCardProps {
  post: RedditPost & { sentiment: SentimentResult };
}

export function PostCard({ post }: PostCardProps) {
  const config: Record<
    SentimentType,
    { label: string; color: string; bg: string }
  > = {
    positive: { label: "Positive", color: "#22c55e", bg: "#1a2e22" },
    neutral: { label: "Neutral", color: "#a1a0a0", bg: "#2d2d2d" },
    negative: { label: "Negative", color: "#ef4444", bg: "#2e1a1a" },
  };

  const c = config[post.sentiment.type];

  return (
    <article className="rounded-lg bg-card p-4 transition-shadow hover:bg-[#1c1c1c]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <a
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            <h3 className="line-clamp-2 text-base font-semibold leading-snug text-white group-hover:text-gray-300 sm:text-lg">
              {post.title}
            </h3>
          </a>
          <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
            <span className="inline-flex items-center gap-1.5">
              <span aria-hidden="true">▲</span>
              {post.score.toLocaleString()}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span aria-hidden="true">💬</span>
              {post.comments.toLocaleString()}
            </span>
            <span>u/{post.author}</span>
          </p>
        </div>
        <div className="shrink-0 self-start rounded-full px-3 py-1" style={{ backgroundColor: c.bg }}>
          <span className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: c.color }}>
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: c.color }}
              aria-hidden="true"
            />
            {c.label}
          </span>
        </div>
      </div>
      <p className="mt-3 text-sm font-medium text-gray-500">
        Sentiment score: {post.sentiment.score}
      </p>
    </article>
  );
}
