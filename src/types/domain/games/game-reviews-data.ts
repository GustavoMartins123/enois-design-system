import type { GameReviewData } from "./game-review-data.js";

export type GameReviewsData = {
  average: number;
  count: number;
  items: GameReviewData[];
};
