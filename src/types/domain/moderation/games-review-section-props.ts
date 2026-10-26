import type { GameReviewData } from "./game-review-data.js";

export type GamesReviewSectionProps = {
  loading: boolean;
  games: GameReviewData[];
  /** A decision is being recorded: the decision buttons are disabled. */
  pending?: boolean;
  /** Approves the game with the typed note. */
  onApprove: (gameId: string, note: string) => void;
  /** Rejects the game with the typed note (required). */
  onReject: (gameId: string, note: string) => void;
};
