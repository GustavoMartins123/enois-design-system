/** Os campos da conversa que a linha da lista lê. */
export type ConversationItemData = {
  title?: string | null;
  lastMessage?: string | null;
  unread: number;
};
