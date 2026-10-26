import type { IdentityVerificationState } from "./identity-verification-state.js";

export type IdentityVerificationStatus = {
  state?: IdentityVerificationState | null;
  verified?: boolean;
  provider?: string | null;
  providerAvailable?: boolean;
};
