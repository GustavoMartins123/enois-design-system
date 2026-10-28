/** Metadata of an e-mail sent by the platform. */
export type EmailLogData = {
  id: string;
  toEmail: string;
  subject: string;
  kind: string;
  status: string;
  error: string | null;
  /** Formatted sending date and time. */
  createdAtLabel: string;
};
