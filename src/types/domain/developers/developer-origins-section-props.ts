import type { DeveloperOriginData } from "./developer-origin-data.js";

export type DeveloperOriginsSectionProps = {
  authenticated: boolean;
  /** Sign-in page, linked when the visitor is not authenticated. */
  loginHref: string;
  loading: boolean;
  origins: DeveloperOriginData[];
  addPending?: boolean;
  /** Registers the origin; resolves `true` when it was saved (the field is then cleared). */
  onAdd: (origin: string) => Promise<boolean>;
  removePending?: boolean;
  onRemove: (id: string) => void;
};
