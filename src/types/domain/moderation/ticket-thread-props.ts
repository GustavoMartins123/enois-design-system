import type { TicketMessageData } from "./ticket-message-data.js";

export type TicketThreadProps = {
  messages: TicketMessageData[];
  /** The ticket is mirrored to a GitHub issue: replies are published there too. */
  mirrored: boolean;
  /** The single admin reply of tickets older than the conversation, shown when there are no messages. */
  legacyReply: string | null;
  /** Formatted date and time of the legacy reply. */
  legacyRepliedAtLabel: string | null;
  /** The conversation failed to load. */
  error?: boolean;
};
