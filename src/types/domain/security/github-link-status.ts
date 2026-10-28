import type { GitHubSyncState } from "./github-sync-state.js";

export type GitHubLinkStatus = {
  linked: boolean;
  login?: string | null;
  syncState?: GitHubSyncState | null;
  /** Data da última sincronização já formatada; `null` quando ainda não sincronizou. */
  lastSyncLabel?: string | null;
};
