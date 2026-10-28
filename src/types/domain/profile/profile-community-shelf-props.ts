import type { ProfileCommunityItem } from "./profile-community-item.js";

export type ProfileCommunityShelfProps = {
  communities: ProfileCommunityItem[];
  loading: boolean;
  /** Para onde vai o "Explorar comunidades". */
  communitiesHref: string;
};
