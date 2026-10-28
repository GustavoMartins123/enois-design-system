import type { PullRequestData } from "./pull-request-data.js";
import type { PullRequestReviewDecision } from "./pull-request-review-decision.js";

export type PullRequestsSectionProps = {
  loading: boolean;
  pulls: PullRequestData[];
  /** GitHub is linked without write access: offers reconnecting with write permission. */
  showWriteHint: boolean;
  connectWritePending?: boolean;
  onConnectWrite: () => void;
  /** The review being sent: `key` is `repository#number`. Only that row is disabled. */
  reviewing: { key: string; decision: PullRequestReviewDecision } | null;
  /**
   * Sends the review (the trimmed comment only with REQUEST_CHANGES); resolves `true` when it was
   * sent, which closes the comment box and clears the draft.
   */
  onReview: (
    pull: PullRequestData,
    decision: PullRequestReviewDecision,
    comment?: string,
  ) => Promise<boolean>;
};
