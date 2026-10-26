import type { DailyRankingSource } from "./daily-ranking-source.js";
import type { MazeDirection } from "./maze-direction.js";
import type { MazeRankingItem } from "./maze-ranking-item.js";
import type { MazeState } from "./maze-state.js";

export type DailyMazeProps = {
  loading: boolean;
  loadError: boolean;
  onRetryLoad: () => void;
  canTogglePrevious: boolean;
  showPrevious: boolean;
  onTogglePrevious: () => void;
  /** O desafio exibido (hoje ou ontem). */
  state?: MazeState;
  onStart: () => void;
  startPending: boolean;
  startError: boolean;
  movePending: boolean;
  moveFailed: boolean;
  /** Mensagem do servidor quando o passo falhou; sem ela vale a mensagem padrão. */
  moveErrorMessage: string | null;
  onMove: (direction: MazeDirection) => void;
  ranking: DailyRankingSource<MazeRankingItem>;
};
