import type { AnchorHTMLAttributes } from "react";

/** What the design system hands to the app's link component: an app path plus anchor attributes. */
export type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: string };
