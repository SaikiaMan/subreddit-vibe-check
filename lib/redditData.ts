import { existsSync } from "fs";
import type { RedditPost } from "./reddit";
import { loadFixturePosts } from "./redditFixture";

/**
 * Clean data-fetching abstraction for the Subreddit Vibe Check dashboard.
 *
 * During development this function reads a locally saved Reddit JSON fixture
 * (`data/reddit/{subreddit}-hot.json`) so the UI and sentiment pipeline can be
 * developed and demoed while Reddit Data API access is pending approval.
 *
 * Once Reddit approves the Data API application and OAuth credentials are
 * configured in .env.local, replace the body of this function with a call to
 * the real API client (e.g. `import("./redditApi").then((m) => m.getHotPosts(subreddit))`).
 */
export async function fetchSubredditPosts(
  subreddit: string,
): Promise<RedditPost[]> {
  const cleanSubreddit = subreddit.replace(/^r\//, "").trim() || "programming";

  const fixturePath = `${process.cwd()}/data/reddit/${cleanSubreddit}-hot.json`;

  if (existsSync(fixturePath)) {
    return loadFixturePosts(cleanSubreddit, 50);
  }

  // Fallback: if no fixture exists for the requested subreddit, load the
  // programming fixture so the UI still renders during development.
  return loadFixturePosts("programming", 50);
}
