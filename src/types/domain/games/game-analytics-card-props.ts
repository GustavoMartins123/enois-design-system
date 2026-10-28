import type { GameAnalyticsData } from "./game-analytics-data.js";

export type GameAnalyticsCardProps = {
  /** Janela escolhida (7, 30 ou 90 dias): o app busca os números dela. */
  days: number;
  onDaysChange: (days: number) => void;
  data?: GameAnalyticsData;
  loading: boolean;
  error: boolean;
};
