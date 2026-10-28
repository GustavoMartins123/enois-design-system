/** A support ticket in the moderation queue. */
export type SupportTicketData = {
  id: string;
  /** Category code; the view shows its label. */
  category: string;
  /** OPEN, IN_PROGRESS or CLOSED; drives the badge and the available action. */
  status: string;
  subject: string;
  message: string;
  contactEmail: string;
  imageUrl: string | null;
  /** Legacy single reply; the section passes it on through `renderThread` (`TicketThread`). */
  adminReply: string | null;
  githubIssueNumber: number | null;
  githubIssueUrl: string | null;
  /** Formatted opening date and time. */
  createdAtLabel: string;
  /** Formatted reply date and time, when there is one. */
  repliedAtLabel: string | null;
};
