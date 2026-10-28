/** A recently created account with suspicious signals. */
export type SuspiciousUserData = {
  username: string;
  name: string;
  riskScore: number;
  staff: boolean;
  posts: number;
  comments: number;
  reportsAgainst: number;
  /** Signal codes; the view shows their labels. */
  signals: string[];
  /** Formatted creation date. */
  createdAtLabel: string;
};
