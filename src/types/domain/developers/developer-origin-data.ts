/** An origin allowed to call the public API from the browser. */
export type DeveloperOriginData = {
  id: string;
  origin: string;
  blocked?: boolean;
  blockedReason?: string | null;
};
