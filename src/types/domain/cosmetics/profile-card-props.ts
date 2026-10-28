import type { ReactNode } from "react";

import type { ProfileCardData } from "./profile-card-data.js";

export type ProfileCardProps = {
  profile: ProfileCardData;
  /**
   * Custom banner (the sandboxed HTML banner). The equipped official banner wins over it, and
   * it wins over the uploaded photo.
   */
  bannerSlot?: ReactNode;
  /** Next to the name: aka chip, contributor tag... */
  nameAddon?: ReactNode;
  /** Replaces the default meta line (`@username · pronouns`). */
  meta?: ReactNode;
  /** Replaces the plain-text bio (rich bio). */
  bio?: ReactNode;
  /** Buttons under the bio. */
  actions?: ReactNode;
  /** Extra sections at the end of the card. */
  children?: ReactNode;
  /** Change it to play the profile effect again. */
  effectReplayKey?: number | string;
  /** Compact layout for popovers: smaller banner and avatar, short bio, no tilt or effect. */
  compact?: boolean;
  className?: string;
};
