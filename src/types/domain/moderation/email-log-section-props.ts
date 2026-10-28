import type { EmailLogData } from "./email-log-data.js";

export type EmailLogSectionProps = {
  loading: boolean;
  emails: EmailLogData[];
};
