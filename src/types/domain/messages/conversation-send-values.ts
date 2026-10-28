/** O que o compositor manda: o app sobe as imagens e envia a mensagem. */
export type ConversationSendValues = {
  text: string;
  files: File[];
  mediaSpoiler: boolean;
};
