import type { RedditPost } from "./reddit";

/**
 * Clean data-fetching abstraction for the Subreddit Vibe Check dashboard.
 *
 * Currently returns deterministic mock data so the UI and sentiment pipeline can
 * be developed and demoed while Reddit Data API access is pending approval.
 *
 * Once Reddit approves the Data API application and OAuth credentials are
 * configured in .env.local, replace the body of this function with a call to
 * the real API client (e.g. `import("./redditApi").then((m) => m.getHotPosts(subreddit))`).
 */
export async function fetchSubredditPosts(
  subreddit: string,
): Promise<RedditPost[]> {
  const cleanSubreddit = subreddit.replace(/^r\//, "").trim() || "programming";

  // Simulate a small network delay so the UI behaves like a real fetch.
  await new Promise((resolve) => setTimeout(resolve, 150));

  const baseTitles = [
    "This new technology is absolutely amazing!",
    "I love how much better this update has become",
    "The community is doing a great job",
    "This is probably the best feature released this year",
    "What do you think about this new development?",
    "Interesting discussion about the future of technology",
    "Can someone explain how this works?",
    "This update completely ruined everything",
    "I am really disappointed with this change",
    "This is the worst update I've seen in years",
  ];

  return Array.from({ length: 50 }, (_, index) => {
    const title = baseTitles[index % baseTitles.length];
    return {
      id: `mock-${cleanSubreddit}-${index + 1}`,
      title,
      author: `user${index + 1}`,
      score: 100 + index * 23,
      comments: 10 + index * 3,
      url: "https://www.reddit.com",
      permalink: "https://www.reddit.com",
      created: Date.now() / 1000,
    };
  });
}
