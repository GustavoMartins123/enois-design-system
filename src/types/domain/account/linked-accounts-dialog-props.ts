import type { ReactNode } from "react";

import type { LinkedProviderRow } from "./linked-provider-row.js";
import type { LinkedinSyncStatus } from "./linkedin-sync-status.js";

export type LinkedAccountsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  loading?: boolean;
  providers: LinkedProviderRow[];
  /** Vincular ou desvincular em andamento: os botões dos provedores ficam desabilitados. */
  busy?: boolean;
  onLink: (provider: string) => void;
  onUnlink: (provider: string) => void;
  /** Falha da última ação, já traduzida pelo app. */
  errorMessage?: string | null;
  /** Bloco de sincronização com o LinkedIn; ausente quando o LinkedIn não está vinculado. */
  linkedinSync?: LinkedinSyncStatus | null;
  syncPending?: boolean;
  onSyncChange: (enabled: boolean) => void;
  reconnectPending?: boolean;
  onReconnect: () => void;
  /** A importação de dados do LinkedIn, logo abaixo da lista. */
  importSection?: ReactNode;
};
