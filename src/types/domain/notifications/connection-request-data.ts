import type { ConnectionRequestProfile } from "./connection-request-profile.js";

/** A pending connection request with its sender profile already resolved. */
export type ConnectionRequestData = {
  id: string;
  fromUserId: string;
  /** Already formatted request date. */
  dateLabel: string;
  /** Sender profile page; null when the sender has no username. */
  profileHref: string | null;
  profile: ConnectionRequestProfile | null;
};
