import type { ConversationItemData } from "./conversation-item-data.js";
import type { ConversationPeerData } from "./conversation-peer-data.js";

export type ConversationItemProps = {
  conversation: ConversationItemData;
  peer?: ConversationPeerData | null;
  profileHref: string;
  /** Hora da última mensagem, já formatada pelo app ("" quando não há). */
  timeLabel: string;
  isActive: boolean;
  onSelect: () => void;
  /** Modo de seleção em massa. */
  selecting?: boolean;
  selected?: boolean;
};
