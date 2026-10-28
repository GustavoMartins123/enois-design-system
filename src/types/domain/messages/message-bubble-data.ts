/** Os campos da mensagem que o balão lê. */
export type MessageBubbleData = {
  reactions?: Record<string, number> | null;
  myReaction?: string | null;
};
