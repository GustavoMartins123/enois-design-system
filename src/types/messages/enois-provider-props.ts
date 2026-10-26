import type { ReactNode } from "react";

import type { Adapters } from "../adapters/adapters.js";

import type { MessagesOverride } from "./messages-override.js";

export type EnoisProviderProps = Partial<Adapters> & {
  messages?: MessagesOverride;
  children: ReactNode;
};
