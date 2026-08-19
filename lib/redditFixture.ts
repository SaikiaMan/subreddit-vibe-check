import { readFile } from "fs/promises";
import { join } from "path";
import type { RedditListingResponse, RedditPost } from "./reddit";

interface FixturePostData {
  id: string;
  title: string;
  author: string;
  score: number;
  num_comments: number;
  url: string;
  permalink: string;
  created_utc: number;
}

interface FixturePost {
  kind: string;
  data: FixturePostData;
}

function isValidPost(entry: unknown): entry is FixturePost {
  if (typeof entry !== "object" || entry === null) return false;

  const post = entry as { kind?: unknown; data?: unknown };

  if (post.kind !== "t3") return false;
  if (typeof post.data !== "object" || post.data === null) return false;

  const data = post.data as Record<string, unknown>;

  const requiredStrings = ["id", "title", "author", "url", "permalink"];
  for (const key of requiredStrings) {
    if (typeof data[key] !== "string") return false;
  }

  if (typeof data.score !== "number") return false;
  if (typeof data.num_comments !== "number") return false;
  if (typeof data.created_utc !== "number") return false;

  return true;
}

function parseFixture(json: unknown): RedditListingResponse {
  if (typeof json !== "object" || json === null) {
    throw new Error("Invalid fixture: expected JSON object.");
  }

  const listing = json as Record<string, unknown>;

  if (listing.kind !== "Listing") {
    throw new Error("Invalid fixture: expected kind 'Listing'.");
  }

  const data = listing.data as Record<string, unknown>;
  const children = data.children;

  if (!Array.isArray(children)) {
    throw new Error("Invalid fixture: expected data.children array.");
  }

  const validChildren = children.filter(isValidPost);

  return {
    data: {
      children: validChildren.map(({ data }) => ({ data })),
    },
  };
}

/**
 * Load a saved Reddit `/r/{subreddit}/hot` JSON fixture from disk.
 *
 * This is intended for local development and demos only. It does NOT call the
 * Reddit API or scrape Reddit. Replace with `getHotPosts` from `lib/redditApi.ts`
 * once Reddit Data API access is approved and OAuth credentials are available.
 */
export async function loadFixturePosts(
  subreddit: string,
  maxPosts = 50,
): Promise<RedditPost[]> {
  const cleanSubreddit = subreddit.replace(/^r\//, "").trim() || "programming";

  const fixturePath = join(
    process.cwd(),
    "data",
    "reddit",
    `${cleanSubreddit}-hot.json`,
  );

  const raw = await readFile(fixturePath, "utf-8");
  const json: unknown = JSON.parse(raw);
  const listing = parseFixture(json);

  return listing.data.children.slice(0, maxPosts).map(({ data }) => ({
    id: data.id,
    title: data.title,
    author: data.author,
    score: data.score,
    comments: data.num_comments,
    url: data.url,
    permalink: `https://www.reddit.com${data.permalink}`,
    created: data.created_utc,
  }));
}
