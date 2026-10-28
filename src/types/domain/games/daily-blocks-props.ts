import type { RefObject } from "react";

import type { BlocksAction } from "./blocks-action.js";
import type { BlocksLocalGame } from "./blocks-local-game.js";
import type { BlocksRankingItem } from "./blocks-ranking-item.js";
import type { BlocksState } from "./blocks-state.js";
import type { DailyRankingSource } from "./daily-ranking-source.js";

export type DailyBlocksProps = {
  loading: boolean;
  loadError: boolean;
  onRetryLoad: () => void;
  canTogglePrevious: boolean;
  showPrevious: boolean;
  onTogglePrevious: () => void;
  /** O desafio exibido (hoje ou ontem). */
  state?: Pick<BlocksState, "date" | "status">;
  onStart: () => void;
  startPending: boolean;
  startError: boolean;
  /** A partida local em andamento (o app roda o loop e a sincronização). */
  game: BlocksLocalGame | null;
  /** O resultado validado pelo servidor, quando a partida terminou. */
  official: BlocksState | null;
  /** Ações ainda não confirmadas pelo servidor. */
  pendingCount: number;
  syncError: string | null;
  onAction: (action: BlocksAction) => void;
  onRetrySync: () => void;
  /** O tabuleiro recebe o foco quando a partida começa. */
  boardRef: RefObject<HTMLDivElement | null>;
  ranking: DailyRankingSource<BlocksRankingItem>;
};
