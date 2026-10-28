import type { IdentityVerificationStatus } from "./identity-verification-status.js";

export type IdentityVerificationSectionProps = {
  status?: IdentityVerificationStatus;
  loading?: boolean;
  onStart: () => void;
  startPending?: boolean;
  onRefresh: () => void;
  refreshPending?: boolean;
  onRevoke: () => void;
  revokePending?: boolean;
};
