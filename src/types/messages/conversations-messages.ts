export type ConversationsMessages = {
  conversationHeader: { back: string; conversationFallback: string };
  conversationItem: { conversationFallback: string };
  messageBubble: {
    readReceiptSent: string;
    readReceiptRead: string;
    react: string;
    report: string;
  };
  e2eSetupBanner: {
    prompt: string;
    activate: string;
    loading: string;
    passwordPrompt: string;
    passwordPlaceholder: string;
    passwordError: string;
    definePrompt: string;
    newPasswordPlaceholder: string;
    confirmPasswordPlaceholder: string;
    defineAction: string;
    defineError: string;
    validationMinLength: string;
    validationMismatch: string;
  };
  conversationThread: {
    selectMessages: string;
    selectedMessages: (count: number) => string;
    deleteSelectedMessages: (count: number) => string;
    cancelSelection: string;
    noMessages: string;
    loadOlderMessages: string;
    loadingOlder: string;
    inputPlaceholder: string;
    send: string;
    attachMedia: string;
    removeMedia: string;
    mediaLimit: string;
    mediaError: string;
    mediaSpoiler: string;
    mediaSpoilerActive: string;
    mediaSpoilerBadge: string;
    attachService: string;
    attachServiceTitle: string;
    attachServiceHint: string;
    serviceAttachment: string;
    noServices: string;
    emoji: string;
  };
};
