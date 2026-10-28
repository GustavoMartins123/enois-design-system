import type { GameCommentsData } from "./game-comments-data.js";

export type GameCommentsSectionProps = {
  data?: GameCommentsData;
  loading: boolean;
  /** Quem está lendo (`null` sem sessão). */
  viewerId: string | null;
  ownerId: string;
  addPending?: boolean;
  /** Resolve quando o comentário foi publicado: o campo é limpo. */
  onAdd: (body: string) => Promise<void>;
  onRemove: (commentId: string) => void;
};
