import type { GameAnalyticsDayData } from "./game-analytics-day-data.js";

export type GameAnalyticsData = {
  plays: number;
  players: number;
  favorites: number;
  updates: number;
  series: GameAnalyticsDayData[];
};
