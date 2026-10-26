import type { ReactNode } from "react";

export type PostActionsProps<T extends string = string> = {
  emojis: Record<T, string>;
  /** Reação de quem lê. */
  reactionStatus: T | null;
  onReact: (type: T) => void;
  /** Reação em andamento: a transição para `true` dispara o pulso do ícone. */
  reactionPending: boolean;
  /** Se o pulso pode animar agora (modo lite e movimento reduzido desligam). */
  motionAllowed: () => boolean;
  reactionCount: number;
  commentsCount: number;
  savesCount: number;
  saved: boolean;
  /** Conteúdo de comunidade e os tipos que não viajam não oferecem republicar. */
  canRepost: boolean;
  onShowReactions: () => void;
  /** O que o botão de comentários faz nesta tela: abrir a conversa aqui ou rolar até ela. */
  onComments: () => void;
  onRepost: () => void;
  onShare: () => void;
  onReport: () => void;
  onSave: () => void;
  /** Ações extras no fim da fileira (os selos do feed, por exemplo). */
  children?: ReactNode;
  /** Diálogos da fileira (republicar, reações, selos, denúncia), montados pelo app. */
  dialogs?: ReactNode;
};
