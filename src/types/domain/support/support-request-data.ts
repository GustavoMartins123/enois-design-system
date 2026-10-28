/** A ticket in the requester's history. */
export type SupportRequestData = {
  id: string;
  status: string;
  /** Formatted opening date and time. */
  createdAtLabel: string;
  subject: string;
  message: string;
  adminReply?: string | null;
};
