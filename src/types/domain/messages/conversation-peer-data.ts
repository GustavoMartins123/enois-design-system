/** O outro participante da conversa, como o app o carregou (ausente enquanto não chega). */
export type ConversationPeerData = {
  name?: string | null;
  avatar?: string | null;
  headline?: string | null;
  badge?: string | null;
  badges?: (string | null)[] | null;
};
