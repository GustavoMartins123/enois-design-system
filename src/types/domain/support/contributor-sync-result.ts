/** Outcome of a manual contribution check. */
export type ContributorSyncResult = {
  contributions: number;
  issues: number;
  rateLimited: boolean;
};
