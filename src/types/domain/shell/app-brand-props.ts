import type { MouseEventHandler } from "react";

export type AppBrandProps = {
  /** Where the logo navigates (the app home). */
  href: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};
