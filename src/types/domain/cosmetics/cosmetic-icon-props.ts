import type { ReactNode } from "react";

export type CosmeticIconProps = {
  /** Key of the cosmetic icon library (`carapuca`, `morcego`...); unknown keys render nothing. */
  icon: string | null | undefined;
  className?: string;
  /** Accessible name; without it the icon is decorative. */
  title?: string;
  /** Extra drawing on top of the icon, in the same -12..12 box. */
  children?: ReactNode;
};
