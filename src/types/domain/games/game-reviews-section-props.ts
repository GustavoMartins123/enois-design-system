import type { GameReviewsData } from "./game-reviews-data.js";

export type GameReviewsSectionProps = {
  data?: GameReviewsData;
  loading: boolean;
  /** Quem está lendo (`null` sem sessão). */
  viewerId: string | null;
  ownerId: string;
  savePending?: boolean;
  removePending?: boolean;
  onSave: (rating: number, body: string) => void;
  /** Resolve quando a avaliação saiu: o formulário volta para o zero. */
  onRemove: () => Promise<void>;
};
