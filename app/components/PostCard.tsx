import type { RedditPost } from "@/lib/reddit";
import type { SentimentResult, SentimentType } from "@/lib/sentiment";

interface PostCardProps {
  post: RedditPost & { sentiment: SentimentResult };
  index: number;
}

export function PostCard({ post, index }: PostCardProps) {
  const config: Record<
    SentimentType,
    { label: string; dot: string; bg: string; text: string }
  > = {
    positive: {
      label: "Positive",
      dot: "bg-green-500",
      bg: "bg-green-50",
      text: "text-green-700",
    },
    neutral: {
      label: "Neutral",
      dot: "bg-slate-400",
      bg: "bg-slate-50",
      text: "text-slate-700",
    },
    negative: {
      label: "Negative",
      dot: "bg-red-500",
      bg: "bg-red-50",
      text: "text-red-700",
    },
  };

  const c = config[post.sentiment.type];

  return (
    <article className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 text-xs font-bold text-slate-300">
              #{index}
            </span>
            <div>
              <a
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <h3 className="line-clamp-2 text-base font-semibold leading-snug text-slate-900 group-hover:text-orange-600 sm:text-lg">
                  {post.title}
                </h3>
              </a>
              <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
                <span className="inline-flex items-center gap-1.5">
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M12 19V5M5 12l7-7 7 7" />
                  </svg>
                  {post.score.toLocaleString()}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                  {post.comments.toLocaleString()}
                </span>
                <span>u/{post.author}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-3 self-start sm:flex-col sm:items-end">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full ${c.bg} px-3 py-1 text-sm font-semibold ${c.text}`}
          >
            <span
              className={`h-2 w-2 rounded-full ${c.dot}`}
              aria-hidden="true"
            />
            {c.label}
          </span>
          <span className="text-sm text-slate-500">
            Score: {post.sentiment.score > 0 ? "+" : ""}
            {post.sentiment.score}
          </span>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-slate-50 pt-3">
        <a
          href={post.permalink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm font-medium text-orange-600 transition-colors hover:text-orange-700"
        >
          View on Reddit
          <svg
            className="h-3.5 w-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M7 17 17 7M7 7h10v10" />
          </svg>
        </a>
      </div>
    </article>
  );
}
