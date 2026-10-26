import type { ConversationsMessages } from "../../types/messages/conversations-messages.js";

export const conversationsMessages: ConversationsMessages = {
  conversationHeader: { back: "Voltar", conversationFallback: "Conversa" },
  conversationItem: { conversationFallback: "Conversa" },
  messageBubble: {
    readReceiptSent: "Enviada",
    readReceiptRead: "Lida pela outra pessoa",
    react: "Reagir",
  },
  conversationThread: {
    selectMessages: "Selecionar mensagens",
    selectedMessages: (count: number) =>
      count === 0
        ? "Toque nas mensagens para escolher"
        : `${count} selecionada${count === 1 ? "" : "s"}`,
    deleteSelectedMessages: (count: number) =>
      count === 0 ? "Apagar para mim" : `Apagar ${count} para mim`,
    cancelSelection: "Cancelar",
    noMessages: "Nenhuma mensagem ainda",
    loadOlderMessages: "Ver mensagens anteriores",
    loadingOlder: "Carregando...",
    inputPlaceholder: "Escreva uma mensagem...",
    send: "Enviar mensagem",
    attachMedia: "Anexar imagem",
    removeMedia: "Remover mídia",
    mediaLimit: "Anexe no máximo 4 imagens por mensagem.",
    mediaError: "Não foi possível enviar a imagem.",
    mediaSpoiler: "Marcar mídias como spoiler",
    mediaSpoilerActive: "Mídias marcadas como spoiler",
    mediaSpoilerBadge: "SPOILER",
    attachService: "Anexar o serviço que você presta",
    attachServiceTitle: "Seu serviço",
    attachServiceHint: "Escolha o serviço para mandar o link na conversa.",
    serviceAttachment: "Serviço:",
    noServices: "Você ainda não publicou nenhum serviço.",
    emoji: "Emoji",
  },
};
