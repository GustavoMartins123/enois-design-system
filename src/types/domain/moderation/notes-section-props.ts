import type { AdminPostNoteData } from "./admin-post-note-data.js";
import type { NoteReviewStatus } from "./note-review-status.js";

export type NotesSectionProps = {
  loading: boolean;
  notes: AdminPostNoteData[];
  /** The review being sent. Only that row is disabled. */
  reviewing: { id: string; status: NoteReviewStatus } | null;
  /**
   * Sends the review (the trimmed reason only with DENIED); resolves `true` when it was sent, which
   * closes the reason box and clears the draft.
   */
  onReview: (
    note: AdminPostNoteData,
    status: NoteReviewStatus,
    reason?: string,
  ) => Promise<boolean>;
};
