import type { GameCommentData } from "./game-comment-data.js";

export type GameCommentsData = {
  count: number;
  items: GameCommentData[];
};
