import type { CommunityStatsData } from "./community-stats-data.js";

export type AuthHeroProps = {
  /** Missing while loading or after a failure: the hero then shows no numbers. */
  stats?: CommunityStatsData | null;
};
