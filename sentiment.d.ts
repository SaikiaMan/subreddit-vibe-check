declare module "sentiment" {
  export interface SentimentAnalysisResult {
    score: number;
    comparative: number;
    calculation: Array<Record<string, number>>;
    tokens: string[];
    words: string[];
    positive: string[];
    negative: string[];
  }

  export default class Sentiment {
    analyze(phrase: string): SentimentAnalysisResult;
  }
}
