import Sentiment from "sentiment";

const analyzer = new Sentiment();

export type SentimentType =
  | "positive"
  | "neutral"
  | "negative";

export interface SentimentResult {
  score: number;
  type: SentimentType;
}

export function analyzeSentiment(
  title: string
): SentimentResult {
  const result = analyzer.analyze(title);

  let type: SentimentType;

  if (result.score > 0) {
    type = "positive";
  } else if (result.score < 0) {
    type = "negative";
  } else {
    type = "neutral";
  }

  return {
    score: result.score,
    type,
  };
}