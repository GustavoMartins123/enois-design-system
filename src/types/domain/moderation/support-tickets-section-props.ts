import type { ReactNode } from "react";

import type { SupportTicketData } from "./support-ticket-data.js";

export type SupportTicketsSectionProps = {
  /** History of closed tickets instead of the active queue. */
  history: boolean;
  /** The category is fixed (the "Issues" tab): no category filter and the issues title. */
  locked: boolean;
  /** Category codes offered as filters. */
  categories: string[];
  /** Selected category; `undefined` means all. */
  category: string | undefined;
  onCategoryChange: (category: string | undefined) => void;
  /** Status filters of the active queue ("ALL", "OPEN", "IN_PROGRESS"). */
  statusFilters: string[];
  status: string;
  onStatusChange: (status: string) => void;
  loading: boolean;
  tickets: SupportTicketData[];
  /** A status change is being saved: the action buttons are disabled. */
  pending?: boolean;
  onStart: (ticketId: string) => void;
  onResolve: (ticketId: string) => void;
  onReopen: (ticketId: string) => void;
  /** The conversation of a ticket (`TicketThread`), above the reply form. */
  renderThread: (ticket: SupportTicketData) => ReactNode;
  /** The reply form of a ticket (`TicketReply`). */
  renderReply: (ticketId: string) => ReactNode;
};
