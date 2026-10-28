/** A message of a support ticket conversation, sent from Énóis or mirrored from the GitHub issue. */
export type TicketMessageData = {
  id: string;
  direction: "ENOIS" | "GITHUB";
  /** GitHub login of the author, shown as `@login`; wins over `authorName`. */
  authorGithubLogin?: string | null;
  authorName?: string | null;
  body: string;
  /** Formatted date and time. */
  createdAtLabel: string;
};
