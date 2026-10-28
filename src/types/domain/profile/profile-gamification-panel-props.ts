import type { ProfileGamificationData } from "./profile-gamification-data.js";

export type ProfileGamificationPanelProps = {
  profile: ProfileGamificationData;
  isOwner: boolean;
  postsCount: number;
  /** Saldo já formatado; `null` enquanto a carteira carrega. */
  walletBalance: string | null;
  walletHref: string;
};
