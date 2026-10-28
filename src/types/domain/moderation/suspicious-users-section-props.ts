import type { SuspiciousUserData } from "./suspicious-user-data.js";

export type SuspiciousUsersSectionProps = {
  loading: boolean;
  error: boolean;
  users: SuspiciousUserData[];
  /** Ban types offered in the selector ("BAN", "PERMABAN"); the first is the default. */
  banTypes: string[];
  banPending?: boolean;
  /**
   * Bans the selected accounts; resolves `true` when the request succeeded (the selection and
   * the reason are then cleared). The dialog closes either way.
   */
  onBan: (usernames: string[], type: string, reason: string) => Promise<boolean>;
};
