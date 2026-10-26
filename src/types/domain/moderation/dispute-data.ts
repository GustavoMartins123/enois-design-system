/** A transfer dispute waiting for a decision. */
export type DisputeData = {
  id: string;
  /** Formatted transferred amount. */
  amountLabel: string;
  reason: string;
  /** Formatted opening date and time. */
  createdAtLabel: string;
  entryRef: string;
};
