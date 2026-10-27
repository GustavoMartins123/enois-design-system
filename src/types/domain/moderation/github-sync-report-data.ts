/** Result of a GitHub contributions sync. */
export type GithubSyncReportData = {
  created: number;
  updated: number;
  fetched: number;
  issuesCreated: number;
  issuesUpdated: number;
  issuesFetched: number;
  repositories: string[];
  detailsFetched: number;
  revertedFlagged: number;
  rateLimited: boolean;
  errors: string[];
};
