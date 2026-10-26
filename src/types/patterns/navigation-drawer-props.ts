import type { ReactNode } from "react";

import type { WithRequiredChildren } from "../components/with-required-children.js";

/** Mobile navigation drawer; the navigation goes in `children`. */
export type NavigationDrawerProps = WithRequiredChildren<{
  open: boolean;
  onClose: () => void;
  /** Header slot, usually the app brand. */
  brand: ReactNode;
}>;
