/** A GitHub contribution (merged PR or closed issue) imported as seal evidence. */
export type GithubContributionData = {
  id: string;
  /** PULL_REQUEST or ISSUE. */
  kind: string;
  title: string;
  url: string;
  repository: string;
  number: number;
  /** Énóis username linked to the GitHub login, when there is one. */
  username: string | null;
  githubLogin: string;
  /** PENDING, VALIDATED, REJECTED, CONTESTED or REVOKED. */
  status: string;
  /** Formatted merge date (PR) or close date (issue). */
  happenedAtLabel: string | null;
  hasTests: boolean;
  changedFiles: number;
  additions: number;
  deletions: number;
  score: number;
  /** Labels as the API returns them: a JSON array, or plain text. */
  labels: string | null;
  reverted: boolean;
  reviewNote: string | null;
};
