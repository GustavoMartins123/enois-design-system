/** A community shortcut in the navigation (mine or favorite). */
export type NavigationCommunityData = {
  id: string;
  name: string;
  href: string;
  /** The community's own color, painted on its mark. */
  color?: string | null;
  /** Unread notifications from this community. */
  hasNews?: boolean;
};
