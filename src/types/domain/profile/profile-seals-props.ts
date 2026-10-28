import type { ReactNode } from "react";

import type { ProfileSeal } from "./profile-seal.js";

export type ProfileSealsProps = {
  seals: ProfileSeal[];
  /** A lista de evidências do selo (o `SealEvidenceList` ligado à paginação do app). */
  renderEvidence: (seal: ProfileSeal) => ReactNode;
};
