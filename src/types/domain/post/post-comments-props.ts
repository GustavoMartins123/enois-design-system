import type { ReactNode } from "react";

import type { CommentMediaDraft } from "./comment-media-draft.js";
import type { CommentsError } from "./comments-error.js";
import type { PostCommentNode } from "./post-comment-node.js";

export type PostCommentsProps<C extends PostCommentNode = PostCommentNode> = {
  /** Id do formulário (a resposta rola até ele). */
  formId: string;
  /** Comentários carregados, fixado primeiro e o resto do mais antigo ao mais novo. */
  comments: C[];
  loading: boolean;
  loadingMore: boolean;
  hasMore: boolean;
  error: CommentsError | null;
  onRetry: () => void;
  onLoadMore: () => void;
  /** Renders one comment row (the app wires its data). */
  renderComment: (comment: C, replyingTo?: string) => ReactNode;
  replyToId: string | null;
  onCancelReply: () => void;
  media: CommentMediaDraft[];
  mediaSpoiler: boolean;
  onToggleMediaSpoiler: () => void;
  onRemoveMedia: (index: number) => void;
  /** Insere o marcador da mídia no texto (o pendente vira o id real no upload). */
  onInsertMedia: (index: number) => void;
  onAddImages: (files: File[]) => void;
  onAddAudio: (file: File) => void;
  onErrorChange: (error: CommentsError | null) => void;
  /** O campo de escrita (com menção) vem do app. */
  composerField: ReactNode;
  /** Há texto ou mídia para enviar. */
  canSend: boolean;
  sending: boolean;
  /** Envia o comentário (com o campo-isca `website`); `true` quando deu certo. */
  onSubmit: (website: string) => Promise<boolean>;
  onOpenGifPicker: () => void;
  gifPicker?: ReactNode;
};
