import type { RedditPost } from "@/lib/reddit";
import type { SentimentResult } from "@/lib/sentiment";
import { PostCard } from "./PostCard";

interface PostListProps {
  posts: Array<RedditPost & { sentiment: SentimentResult }>;
}

export function PostList({ posts }: PostListProps) {
  return (
    <div className="h-full rounded-lg bg-card p-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-lg font-bold text-white sm:text-xl">Hot Posts</div>
        <div className="text-sm text-gray-500">Latest 50 posts</div>
      </div>
      <div className="grid max-h-[420px] gap-3 overflow-y-auto pr-1">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
