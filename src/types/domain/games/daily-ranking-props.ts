import type { DailyRankingEntry } from "./daily-ranking-entry.js";

export type DailyRankingProps = {
  /** Classe do título (cada jogo tem o seu espaçamento). */
  titleClassName: string;
  loading: boolean;
  error: boolean;
  onRetry: () => void;
  entries?: DailyRankingEntry[];
};
