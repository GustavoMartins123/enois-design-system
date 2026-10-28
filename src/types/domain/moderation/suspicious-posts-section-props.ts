import type { SuspiciousPostData } from "./suspicious-post-data.js";

export type SuspiciousPostsSectionProps = {
  loading: boolean;
  posts: SuspiciousPostData[];
  deletePending?: boolean;
  /**
   * Deletes the selected posts with the trimmed reason; resolves `true` when the request
   * succeeded (the selection and the reason are then cleared). The dialog closes either way.
   */
  onDelete: (postIds: string[], reason: string) => Promise<boolean>;
};
