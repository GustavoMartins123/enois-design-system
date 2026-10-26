import { createContext, useContext } from "react";

import type { Adapters } from "../types/adapters/adapters.js";
import type { LinkProps } from "../types/adapters/link-props.js";

function PlainLink({ href, ...props }: LinkProps) {
  return <a href={href} {...props} />;
}

export const defaultAdapters: Adapters = {
  Link: PlainLink,
  resolveMediaUrl: (url) => url || undefined,
};

export const AdaptersContext = createContext<Adapters>(defaultAdapters);

export function useAdapters(): Adapters {
  return useContext(AdaptersContext);
}
