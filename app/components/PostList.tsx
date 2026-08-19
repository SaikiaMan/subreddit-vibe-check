import type { RedditPost } from "@/lib/reddit";
import type { SentimentResult } from "@/lib/sentiment";
import { PostCard } from "./PostCard";

interface PostListProps {
  posts: Array<RedditPost & { sentiment: SentimentResult }>;
}

export function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return (
      <section className="rounded-2xl border border-slate-100 bg-white p-8 text-center shadow-sm">
        <p className="text-slate-500">No posts available to analyze.</p>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
      <h3 className="mb-4 text-lg font-bold text-slate-900 sm:text-xl">
        Hot Posts
      </h3>
      <div className="grid gap-4">
        {posts.map((post, index) => (
          <PostCard key={post.id} post={post} index={index + 1} />
        ))}
      </div>
    </section>
  );
}
