import type { ReactNode } from "react";

import type { DailyPrizeTier } from "./daily-prize-tier.js";

export type DailyGamesPanelProps = {
  /** Status de cada desafio de hoje ("WON", "IN_PROGRESS", "PLAYING"...), quando já carregou. */
  wordsStatus?: string;
  mazeStatus?: string;
  blocksStatus?: string;
  prizes?: DailyPrizeTier[];
  communityHref: string;
  /** Os jogos de cada aba (só a aba ativa é montada). */
  words: ReactNode;
  maze: ReactNode;
  blocks: ReactNode;
};
