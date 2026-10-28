import type { ReactNode } from "react";

export type ChatDockWindowProps = {
  /** A conversa ainda está carregando: mostra a moldura com o aviso no lugar do filão. */
  loading: boolean;
  onClose: () => void;
  /** O filão (`ConversationThread`), já montado pelo app. */
  children?: ReactNode;
};
