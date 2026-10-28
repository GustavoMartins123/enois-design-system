import type { AppealData } from "./appeal-data.js";

export type AppealsSectionProps = {
  loading: boolean;
  appeals: AppealData[];
  /** A decision is being recorded: both buttons are disabled. */
  pending?: boolean;
  onApprove: (appealId: string) => void;
  onDeny: (appealId: string) => void;
};
