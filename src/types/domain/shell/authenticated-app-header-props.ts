import type { ReactNode } from "react";

export type AuthenticatedAppHeaderProps = {
  /** Where the brand navigates. */
  homeHref: string;
  /** Opens the mobile navigation drawer. */
  onOpenNavigation: () => void;
  /** Search slot (global search). */
  search: ReactNode;
  /** Right-side actions (theme toggle, notifications, account menu). */
  actions: ReactNode;
};
