import type { ReactNode } from "react";

import type { ConversationPeerData } from "./conversation-peer-data.js";

export type ConversationHeaderProps = {
  /** Título próprio da conversa; sem ele vale o nome do outro participante. */
  conversationTitle?: string | null;
  peer?: ConversationPeerData | null;
  /** Perfil do outro participante (o avatar leva até ele). */
  profileHref: string;
  onBack?: () => void;
  /** Ação da tela à direita do nome (hoje: "Selecionar" mensagens). */
  action?: ReactNode;
};
