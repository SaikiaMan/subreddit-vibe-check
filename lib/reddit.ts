export interface RedditPost {
  id: string;
  title: string;
  author: string;
  score: number;
  comments: number;
  url: string;
  permalink: string;
  created: number;
}

interface RedditListingResponse {
  data: {
    children: Array<{
      data: {
        id: string;
        title: string;
        author: string;
        score: number;
        num_comments: number;
        url: string;
        permalink: string;
        created_utc: number;
      };
    }>;
  };
}

export async function getHotPosts(
  subreddit: string
): Promise<RedditPost[]> {
  const cleanSubreddit = subreddit
    .replace(/^r\//, "")
    .trim();

  if (!cleanSubreddit) {
    throw new Error("Please enter a subreddit.");
  }

  const response = await fetch(
    `https://www.reddit.com/r/${encodeURIComponent(
      cleanSubreddit
    )}/hot.json?limit=50`,
    {
      headers: {
        "User-Agent": "subreddit-vibe-check/1.0",
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      `Reddit API returned ${response.status}`
    );
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