import type { ProfileCardData } from "./profile-card-data.js";

export type ProfileMiniCardProps = {
  profile: ProfileCardData;
  /** Link of the "ver perfil" action; without it the action calls `onViewProfile`. */
  href?: string;
  onViewProfile?: () => void;
  className?: string;
};
