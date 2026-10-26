import type { ReactionCountSummary } from "../../lib/reactions/reaction-count-summary.js";

export type ReactionsSummaryProps<T extends string = string> = {
  /** Contagem por tipo (otimista). */
  summary: ReactionCountSummary<T>;
  emojis: Record<T, string>;
  /** Reação de quem lê (pílula destacada). */
  activeType: T | null;
  /** Sem card no store não há onde gravar: as pílulas viram texto. */
  clickable: boolean;
  /** Reação em andamento (bloqueia as pílulas). */
  disabled?: boolean;
  onToggle: (type: T) => void;
};
