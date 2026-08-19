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

export interface RedditListingResponse {
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

export interface RedditApiError {
  status: number;
  message: string;
}
