/** An open pull request of an official repository, waiting for review. */
export type PullRequestData = {
  /** `owner/name`. */
  repository: string;
  number: number;
  title: string;
  url: string;
  authorLogin: string | null;
  authorAvatarUrl: string | null;
  /** Formatted date and time of the last update. */
  updatedAtLabel: string | null;
};
