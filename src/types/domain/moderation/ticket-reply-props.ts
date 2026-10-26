export type TicketReplyProps = {
  pending?: boolean;
  /** Sends the trimmed reply; resolves `true` when it was sent (the field is then cleared). */
  onSubmit: (message: string) => Promise<boolean>;
};
