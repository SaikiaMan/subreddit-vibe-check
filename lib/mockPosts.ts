import { RedditPost } from "@/lib/reddit";

export const mockPosts: RedditPost[] = Array.from(
  { length: 50 },
  (_, index) => ({
    id: `mock-${index + 1}`,
    title: [
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
    ][index % 10],
    author: `user${index + 1}`,
    score: 100 + index * 23,
    comments: 10 + index * 3,
    url: "https://www.reddit.com",
    permalink: "https://www.reddit.com",
    created: Date.now() / 1000,
  })
);