import type { ContributorSyncResult } from "./contributor-sync-result.js";

export type ContributorLinkStatusProps = {
  /** The linked GitHub login. */
  login: string;
  /** The last sync state from the API; "ERROR" shows the failure line. */
  syncState?: string | null;
  syncPending: boolean;
  /** Result of the check made on this screen, if any. */
  syncResult?: ContributorSyncResult | null;
  syncError: boolean;
  onSync: () => void;
  /** Where the GitHub link settings live. */
  securityHref: string;
};
