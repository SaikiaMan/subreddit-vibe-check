# The Subreddit Vibe Check

A modern, minimal dashboard that analyzes the sentiment of the latest hot posts in a subreddit.

## What it does

The Subreddit Vibe Check fetches up to 50 hot posts from a subreddit, runs each title through a sentiment analyzer, and presents the results in a polished dashboard. You can see:

- The overall community vibe (Positive, Neutral, or Negative).
- A normalized **Vibe Score** from -1 to +1.
- The percentage breakdown of positive, neutral, and negative posts.
- A visual sentiment distribution bar.
- A ranked list of hot posts with individual sentiment labels and scores.

## Tech stack

- **Framework:** [Next.js](https://nextjs.org/) 16.3.1
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **UI:** [React](https://react.dev/) 19 + [Tailwind CSS](https://tailwindcss.com/) 4
- **Sentiment analysis:** [`sentiment`](https://www.npmjs.com/package/sentiment) npm package
- **Data source:** Locally saved Reddit JSON fixture (development/demo)

## How Reddit data is represented

This project is designed so the UI never depends on where the data comes from. The public data interface is:

```ts
fetchSubredditPosts(subreddit: string): Promise<RedditPost[]>
```

Currently, `fetchSubredditPosts` reads a local JSON fixture from `data/reddit/{subreddit}-hot.json`. The fixture must be a saved Reddit `/r/{subreddit}/hot` response in the standard Reddit Listing format.

A sample fixture is included at `data/reddit/programming-hot.json` for development and demo purposes. The dashboard shows a **"Demo data • Reddit API integration ready"** indicator whenever the fixture is in use.

### Switching to the official Reddit Data API

The real Reddit Data API integration is isolated in `lib/redditApi.ts` and is ready to be activated once Reddit approves the application and provides OAuth credentials.

Steps to switch:

1. Create a `.env.local` file from `.env.local.example`.
2. Add your Reddit **Client ID** and **Client Secret** after Reddit approves your Data API access request.
3. In `lib/redditData.ts`, replace the fixture call with:

   ```ts
   import { getHotPosts } from "./redditApi";

   export async function fetchSubredditPosts(subreddit: string): Promise<RedditPost[]> {
     return getHotPosts(subreddit);
   }
   ```

Only the data-fetching layer changes. The UI, sentiment analysis, and statistics remain the same.

## Why a local fixture?

Reddit's current Developer Platform requires explicit approval before any Data API or OAuth credentials can be used. Our non-commercial use-case request has been submitted and is pending approval. Until then, the app uses a locally saved Reddit JSON fixture so development and demos can continue without bypassing Reddit's restrictions or scraping content.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The default subreddit is `programming`. You can analyze a different subreddit by typing its name in the search bar and pressing Enter or clicking **Analyze**. The URL updates to `/?subreddit=technology`, for example.

## Building for production

```bash
npm run build
```

## Project structure

```text
app/
  components/          # Dashboard UI components
  loading.tsx        # Loading state
  page.tsx           # Main page (server component)
  SubredditSearch.tsx # Subreddit search input
data/
  reddit/
    programming-hot.json  # Local Reddit JSON fixture
lib/
  reddit.ts          # Shared RedditPost types
  redditApi.ts       # Official Reddit Data API client (OAuth, ready for activation)
  redditData.ts      # Data abstraction (currently uses fixture)
  redditFixture.ts   # Parser for saved Reddit JSON fixtures
  sentiment.ts       # Sentiment analysis wrapper
```

## Notes

- `.env.local` is ignored by Git. Never commit Reddit credentials.
- The fixture parser safely skips malformed entries.
- The sentiment analyzer uses the `sentiment` npm package, which assigns a polarity score to each title.
