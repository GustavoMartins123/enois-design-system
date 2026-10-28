export type LinkedInSyncPromptProps = {
  /** O servidor ainda não consegue publicar: o diálogo explica em vez de perguntar. */
  notReady: boolean;
  /** Falta a chave do servidor (e não a permissão da pessoa). */
  serverKeyMissing: boolean;
  pending?: boolean;
  onClose: () => void;
  onAnswer: (enabled: boolean) => void;
};
