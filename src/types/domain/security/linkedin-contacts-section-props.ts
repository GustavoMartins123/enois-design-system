import type { LinkedinContactsSummary } from "./linkedin-contacts-summary.js";

export type LinkedinContactsSectionProps = {
  /** `null` enquanto carrega (ou quando falhou): o botão do convite fica travado. */
  summary: LinkedinContactsSummary | null;
  /** O resumo não carregou: mostra o aviso com tentar de novo. */
  loadError?: boolean;
  onRetry: () => void;
  retrying?: boolean;
  onAutoInviteChange: (enabled: boolean) => void;
  autoInvitePending?: boolean;
  /** O arquivo já passou pelo teto de tamanho. */
  onImport: (file: File) => void;
  importPending?: boolean;
};
