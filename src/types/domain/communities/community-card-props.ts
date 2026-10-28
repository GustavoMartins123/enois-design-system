import type { ReactNode } from "react";

import type { CommunityCardData } from "./community-card-data.js";

export type CommunityCardProps = {
  community: CommunityCardData;
  /** Where the card navigates (the community page). */
  href: string;
  joinPending: boolean;
  leavePending: boolean;
  /** The owner cannot leave before transferring: the warning shows on the card itself. */
  ownerBlocked: boolean;
  onJoin: () => void;
  onLeave: () => void;
  /** Top-right slot, usually the favorite button. */
  favorite?: ReactNode;
};
