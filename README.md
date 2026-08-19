
# The Subreddit Vibe Check

A Reddit community sentiment dashboard that analyzes the titles of the top 50 Hot posts from a selected subreddit and presents the results as an easy-to-understand community vibe.

## Live Demo

[View the live application](YOUR_VERCEL_URL_HERE)

## Source Code

https://github.com/SaikiaMan/subreddit-vibe-check

---

## Overview

The Subreddit Vibe Check allows users to enter a subreddit and analyze the sentiment of its Hot posts.

The application:

- Fetches or loads up to 50 Hot posts
- Extracts the actual post titles
- Performs sentiment analysis using the `sentiment` npm package
- Classifies posts as Positive, Neutral, or Negative
- Calculates sentiment percentages
- Calculates an overall community vibe
- Calculates an aggregate Vibe Score
- Displays individual post sentiment results
- Provides links to the original Reddit posts

The project is structured to support the official Reddit Data API once the required Reddit API access and OAuth credentials are available.

---

## How It Works

```text
                    User
                     |
                     v
             Enter subreddit
                     |
                     v
            SubredditSearch
                     |
                     v
          ?subreddit=technology
                     |
                     v
         fetchSubredditPosts()
                     |
            +--------+--------+
            |                 |
            v                 v
      Reddit Data API     JSON Fixture
       (when approved)   (current demo)
            |                 |
            +--------+--------+
                     |
                     v
                 RedditPost[]
                     |
                     v
             Sentiment Analysis
                     |
                     v
          Positive / Neutral / Negative
                     |
                     v
              Vibe Calculations
                     |
                     v
                 Dashboard
````

The data source is separated from the rest of the application. This allows the Reddit API to be enabled later without rewriting the dashboard or sentiment-analysis pipeline.

---

## Sentiment Analysis

The project uses the [`sentiment`](https://www.npmjs.com/package/sentiment) npm package.

Each actual Reddit post title is passed through the sentiment analyzer:

```text
Reddit post title
       |
       v
sentiment.analyze(title)
       |
       v
Sentiment score
       |
       v
Positive / Neutral / Negative
```

The dashboard dynamically calculates:

* Positive post count
* Neutral post count
* Negative post count
* Positive percentage
* Neutral percentage
* Negative percentage
* Overall community vibe
* Aggregate Vibe Score

Sentiment values and percentages are not hardcoded.

---

## Dashboard

### Community Vibe

The dashboard provides an overall classification of the selected community based on the analyzed posts.

Possible classifications:

* Positive
* Neutral
* Negative

### Sentiment Distribution

The dashboard displays:

* Positive percentage and post count
* Neutral percentage and post count
* Negative percentage and post count

### Vibe Score

The Vibe Score is calculated from the sentiment scores of the analyzed posts rather than being manually assigned.

### Hot Posts

Each analyzed post displays:

* Post title
* Reddit score
* Comment count
* Author
* Sentiment classification
* Sentiment score
* Link to the original Reddit post

---

## Reddit Data API

### Current Status

The project is architected for the official Reddit Data API, but live API access was not available during development.

The Reddit application `Substantial_Cap1135` was registered and a non-commercial Data API access request was submitted.

During testing, server-side requests to the Reddit Hot endpoint returned HTTP 403.

The investigation determined that the issue was related to Reddit's current API authorization requirements rather than an application-level request or frontend issue.

Reddit currently requires approved Data API access and OAuth authentication for programmatic access.

### Current Development Mode

While waiting for API access, the project uses a locally saved Reddit JSON response as a development fixture.

The fixture follows Reddit's Listing JSON structure and is converted into the application's internal:

```typescript
RedditPost[]
```

format.

This allows the complete sentiment-analysis and dashboard pipeline to be developed and tested without claiming that the current application has live Reddit API access.

### Future API Integration

Once Reddit provides the required approval and OAuth credentials, the data provider can be switched to the official Reddit API:

```text
Reddit OAuth
      |
      v
/r/{subreddit}/hot
      |
      v
50 posts
      |
      v
RedditPost[]
      |
      v
Sentiment Analysis
      |
      v
Dashboard
```

The rest of the application does not need to be redesigned.

---

## Project Structure

```text
subreddit-vibe-check/
|
├── app/
│   ├── components/
│   ├── loading.tsx
│   ├── page.tsx
│   ├── SubredditSearch.tsx
│   └── globals.css
|
├── data/
│   └── reddit/
│       └── programming-hot.json
|
├── lib/
│   ├── reddit.ts
│   ├── redditApi.ts
│   ├── redditData.ts
│   ├── redditFixture.ts
│   ├── sentiment.ts
│   └── mockPosts.ts
|
├── public/
|
├── .env.local.example
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

### Important Modules

#### `app/page.tsx`

The main dashboard and application data flow.

Responsible for:

* Reading the selected subreddit
* Loading posts
* Running sentiment analysis
* Calculating statistics
* Rendering the dashboard

#### `app/SubredditSearch.tsx`

Client-side subreddit search component.

Handles:

* User input
* Analyze button
* Subreddit navigation
* URL query parameters

Example:

```text
/?subreddit=technology
```

#### `lib/sentiment.ts`

Contains the sentiment-analysis logic.

Post titles are passed to the `sentiment` package through this layer.

#### `lib/reddit.ts`

Contains shared Reddit post and response types.

#### `lib/redditFixture.ts`

Converts locally saved Reddit JSON data into the application's `RedditPost[]` format.

#### `lib/redditApi.ts`

Contains the prepared OAuth-based Reddit API integration.

It is isolated from the UI so it can be activated when Reddit API credentials become available.

#### `lib/redditData.ts`

Provides the common data-access interface:

```typescript
fetchSubredditPosts(subreddit)
```

This allows the application to switch between:

```text
Local Fixture -> Reddit API
```

without changing the dashboard.

---

## Tech Stack

### Frontend

* Next.js 16
* React 19
* TypeScript
* Tailwind CSS

### Data and Analysis

* Reddit Data API integration layer
* Reddit Listing JSON fixture
* `sentiment` npm package

### Development and Deployment

* Git
* GitHub
* Vercel

---

## Running Locally

Clone the repository:

```bash
git clone https://github.com/SaikiaMan/subreddit-vibe-check.git
```

Enter the project:

```bash
cd subreddit-vibe-check
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## Environment Variables

The project includes:

```text
.env.local.example
```

The future Reddit API integration expects credentials to remain server-side.

Example:

```env
REDDIT_CLIENT_ID=your_client_id
REDDIT_CLIENT_SECRET=your_client_secret
```

Actual credentials must never be committed to GitHub.

---

## Validation

The project has been tested using:

```bash
npm run lint
```

and:

```bash
npm run build
```

Both checks pass in the current implementation.

---

## API Integration Architecture

The application intentionally separates data acquisition from presentation and sentiment analysis.

### Current Development Flow

```text
Local Reddit JSON
       |
       v
redditFixture.ts
       |
       v
RedditPost[]
       |
       v
Sentiment Analysis
       |
       v
Dashboard
```

### Future Production Flow

```text
Reddit OAuth
       |
       v
redditApi.ts
       |
       v
RedditPost[]
       |
       v
Sentiment Analysis
       |
       v
Dashboard
```

This architecture means that Reddit API access can be added without rewriting the existing dashboard.

---

## API Access Investigation

During development, the Reddit API was investigated to determine why requests to the Hot endpoint returned HTTP 403.

The investigation established that:

1. Reddit currently requires approved Data API access.
2. OAuth authentication is required for Data API access.
3. The application did not have working OAuth credentials during the assignment period.
4. The HTTP 403 could not legitimately be solved through frontend code.
5. The project therefore uses a local JSON fixture while keeping the official API integration ready.

No attempt was made to bypass Reddit's authentication or access controls.

A separate technical report documenting this investigation and the integration architecture is included with the project submission.

---

## Alternative Data Access

If the assessment team explicitly authorizes an alternative data-acquisition method, the data layer can be adapted without changing the rest of the application.

For example, a one-time Reddit JSON fixture can be used for development.

Another option is PRAW (Python Reddit API Wrapper). PRAW is an API wrapper and still requires valid Reddit API credentials and applicable Reddit access permissions.

The preferred production implementation is the official Reddit OAuth-authenticated Data API.

---

## Future Improvements

Once official Reddit API access is available:

* Enable live subreddit fetching
* Add subreddit validation
* Add API rate-limit handling
* Add improved loading states
* Add detailed API error handling
* Cache API responses where appropriate
* Add historical sentiment tracking
* Compare sentiment between multiple subreddits
* Add additional community analytics

---

## Author

Manob RajSaikia

GitHub:

[https://github.com/SaikiaMan](https://github.com/SaikiaMan)

Project:

[https://github.com/SaikiaMan/subreddit-vibe-check](https://github.com/SaikiaMan/subreddit-vibe-check)

---

## Assignment Context

This project was developed as a Full Stack Developer Internship take-home assignment.

The assignment demonstrates:

* Third-party API integration
* API access investigation
* Data transformation
* Client-side sentiment analysis
* Next.js development
* React development
* TypeScript
* Responsive UI development
* Data-source abstraction
* Production-oriented architecture

The application is structured so that the official Reddit Data API can be enabled as soon as the required Reddit authorization and OAuth credentials become available.


