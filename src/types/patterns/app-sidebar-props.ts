import type { WithRequiredChildren } from "../components/with-required-children.js";

/** Desktop sidebar shell; the navigation goes in `children`. */
export type AppSidebarProps = WithRequiredChildren<{
  collapsed: boolean;
  onToggle: () => void;
}>;
