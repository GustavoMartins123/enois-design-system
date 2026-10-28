import type { ContributorApplicationData } from "./contributor-application-data.js";

export type ContributorCardProps = {
  application: ContributorApplicationData;
  /** The status change is being saved: the action buttons are disabled. */
  pending?: boolean;
  /** The last status change failed. */
  saveError?: boolean;
  onReview: () => void;
  onApprove: () => void;
  onReject: () => void;
};
