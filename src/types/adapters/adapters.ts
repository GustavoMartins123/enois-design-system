import type { ComponentType } from "react";

import type { LinkProps } from "./link-props.js";

/**
 * App services the components need but must not implement: routing and media hosting. The app
 * plugs its own through `EnoisProvider`; the defaults keep components usable in tests and stories.
 */
export type Adapters = {
  /** Renders in-app navigation (e.g. the router's Link). Default: a plain `<a>`. */
  Link: ComponentType<LinkProps>;
  /** Turns a stored media path into a URL the browser can load. Default: returns it unchanged. */
  resolveMediaUrl: (url: string | null | undefined) => string | undefined;
};
