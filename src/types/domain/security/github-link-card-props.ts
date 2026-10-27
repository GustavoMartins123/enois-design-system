import type { GitHubLinkStatus } from "./github-link-status.js";
import type { GitHubSyncResult } from "./github-sync-result.js";

export type GitHubLinkCardProps = {
  status?: GitHubLinkStatus;
  loading?: boolean;
  onLink: () => void;
  linkPending?: boolean;
  /** Chamado depois que a pessoa confirma a desvinculação. */
  onUnlink: () => void;
  unlinkPending?: boolean;
  onSync: () => void;
  syncPending?: boolean;
  /** Resultado da última verificação feita nesta tela; `null` antes de verificar. */
  syncResult?: GitHubSyncResult | null;
  syncError?: boolean;
  /** O OAuth do GitHub não está configurado no ambiente (aviso em vez do erro genérico). */
  notConfigured?: boolean;
  /** Qual mutação de vínculo falhou, para escolher a mensagem de erro. */
  error?: "link" | "unlink" | null;
  criteriaHref: string;
};
