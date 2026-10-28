import type { ComponentType } from "react";

/** One main navigation entry, already filtered and resolved by the app. */
export type NavigationItemData = {
  href: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  /** The current route is this entry (or below it). */
  active: boolean;
};
