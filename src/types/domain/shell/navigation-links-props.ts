import type { ComponentPropsWithoutRef } from "react";

import type { NavigationCommunityData } from "./navigation-community-data.js";
import type { NavigationItemData } from "./navigation-item-data.js";

export type NavigationLinksProps = Pick<ComponentPropsWithoutRef<"nav">, "className"> & {
  items: NavigationItemData[];
  myCommunities: NavigationCommunityData[];
  favoriteCommunities: NavigationCommunityData[];
  collapsed?: boolean;
  onNavigate?: () => void;
};
