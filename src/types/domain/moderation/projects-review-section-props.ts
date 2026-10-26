import type { ProjectReviewData } from "./project-review-data.js";

export type ProjectsReviewSectionProps = {
  loading: boolean;
  error: boolean;
  projects: ProjectReviewData[];
  approvePending?: boolean;
  rejectPending?: boolean;
  /** Approves the project; `note` is the typed note, `undefined` when nothing was typed. */
  onApprove: (projectId: string, note: string | undefined) => void;
  /** Rejects the project; `note` is the typed note, `undefined` when nothing was typed. */
  onReject: (projectId: string, note: string | undefined) => void;
};
