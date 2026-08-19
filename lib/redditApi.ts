import type { RedditListingResponse, RedditPost } from "./reddit";

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

function getCredentials(): { clientId: string; clientSecret: string } {
  const clientId = process.env.REDDIT_CLIENT_ID?.trim();
  const clientSecret = process.env.REDDIT_CLIENT_SECRET?.trim();

  if (!clientId || !clientSecret) {
    throw new Error(
      "Missing Reddit OAuth credentials. Set REDDIT_CLIENT_ID and REDDIT_CLIENT_SECRET in .env.local after your Data API access is approved.",
    );
  }

  return { clientId, clientSecret };
}

async function fetchAccessToken(): Promise<string> {
  const { clientId, clientSecret } = getCredentials();

  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64",
  );

  const response = await fetch("https://www.reddit.com/api/v1/access_token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": "subreddit-vibe-check/1.0",
    },
    body: new URLSearchParams({ grant_type: "client_credentials" }),
    cache: "no-store",
  });

  if (!response.ok) {
    const status = response.status;
    if (status === 401) {
      throw new Error(
        "Reddit OAuth rejected the Client ID / Client Secret. Verify credentials and ensure your app has been approved for Data API access.",
      );
    }
    if (status === 403) {
      throw new Error(
        "Reddit Data API access denied. Your app may not be approved yet, or Reddit has blocked requests from this environment.",
      );
    }
    throw new Error(
      `Reddit OAuth token endpoint returned ${status}: ${response.statusText}`,
    );
  }

  const json: TokenResponse = await response.json();
  return json.access_token;
}

function handleHttpError(status: number, subreddit: string): never {
  switch (status) {
    case 401:
      throw new Error(
        "Reddit API returned 401 Unauthorized. The OAuth token may be invalid or expired.",
      );
    case 403:
      throw new Error(
        "Reddit API returned 403 Forbidden. Your app likely has not been approved for Data API access, or requests from this environment are blocked.",
      );
    case 404:
      throw new Error(`Subreddit "${subreddit}" not found.`);
    case 429:
      throw new Error(
        "Reddit API rate limit exceeded. Please wait before trying again.",
      );
    default:
      throw new Error(`Reddit API returned ${status}.`);
  }
}

/**
 * Fetch up to 50 hot posts from a subreddit using Reddit's Data API.
 *
 * IMPORTANT: This function requires a Reddit Client ID and Client Secret from
 * an approved Data API application. As of late 2025, Reddit's Developer
 * Platform does NOT expose these credentials until your non-commercial use case
 * is manually approved. Until then, this function will fail with a 403 error.
 */
export async function getHotPosts(subreddit: string): Promise<RedditPost[]> {
  const cleanSubreddit = subreddit.replace(/^r\//, "").trim();

  if (!cleanSubreddit) {
    throw new Error("Please enter a subreddit.");
  }

  const token = await fetchAccessToken();

  const response = await fetch(
    `https://oauth.reddit.com/r/${encodeURIComponent(cleanSubreddit)}/hot?limit=50`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "User-Agent": "subreddit-vibe-check/1.0",
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    handleHttpError(response.status, cleanSubreddit);
  }

  const json: RedditListingResponse = await response.json();

  return json.data.children.map(({ data }) => ({
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
