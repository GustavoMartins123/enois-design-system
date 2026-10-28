import type { AgeGateMode } from "./age-gate-mode.js";

export type AgeGateProps = {
  open: boolean;
  onClose: () => void;
  mode: AgeGateMode;
  /** Oldest accepted birth date (ISO). */
  minDate: string;
  /** Latest accepted birth date (ISO, today). */
  maxDate: string;
  /** Guardian e-mail the invite went to; switches the parental form to the waiting state. */
  inviteSentTo: string | null;
  /** Server-side error of the last submission. */
  error: string | null;
  declaring: boolean;
  inviting: boolean;
  checking: boolean;
  /** Receives the birth date already validated as ISO (yyyy-mm-dd). */
  onSubmitDate: (birthDate: string) => void;
  /** Receives the trimmed guardian e-mail. */
  onSubmitInvite: (guardianEmail: string) => void;
  onCheckAgain: () => void;
};
