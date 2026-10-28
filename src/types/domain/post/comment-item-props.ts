import type { ReactNode } from "react";

import type { ReactionCountSummary } from "../../lib/reactions/reaction-count-summary.js";

import type { CommentItemData } from "./comment-item-data.js";
import type { PostMediaGridProps } from "./post-media-grid-props.js";
import type { PostRichTextProps } from "./post-rich-text-props.js";

export type CommentItemProps<T extends string = string> = {
  comment: CommentItemData;
  /** Texto atual (a edição troca na hora, sem esperar o refetch). */
  content: string;
  /** Mostra o selo "editado". */
  edited: boolean;
  /** Perfil de quem comentou; sem ele, nome e foto não viram link. */
  profileHref?: string | null;
  /** Tempo relativo do comentário. */
  timeLabel: string;
  /** Nome de quem recebeu a resposta. */
  replyingTo?: string;
  isOwner: boolean;
  /** O autor do post fixa qualquer comentário; o autor do comentário fixa o próprio. */
  canPin: boolean;
  pinning?: boolean;
  emojis: Record<T, string>;
  /** Reação de quem lê. */
  reaction: T | null;
  onReact: (type: T) => void;
  /** Contagem por tipo (otimista): desenha as pílulas, iguais às do post. */
  reactionSummary?: ReactionCountSummary<T>;
  /** Abre a lista de quem reagiu (o contador vira botão). */
  onShowReactions?: () => void;
  onReply: () => void;
  onTogglePin: () => void;
  onDelete: () => void;
  onReport: () => void;
  saving?: boolean;
  editError?: string | null;
  /** Salva o texto editado; `true` fecha a edição. */
  onSaveEdit: (content: string) => Promise<boolean>;
  onCancelEdit: () => void;
  renderRichText: (props: PostRichTextProps) => ReactNode;
  renderMediaGrid: (props: PostMediaGridProps) => ReactNode;
  /** O campo de edição (com menção) vem do app. */
  renderEditField: (value: string, onChange: (value: string) => void) => ReactNode;
  /** Diálogo de denúncia do comentário. */
  reportDialog?: ReactNode;
  /** Diálogo de quem reagiu ao comentário. */
  reactionsDialog?: ReactNode;
};
