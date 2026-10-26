export type HealthyUsageReminderProps = {
  open: boolean;
  /** The button and closing the dialog both dismiss it (the app restarts the count). */
  onDismiss: () => void;
  /** The brand icon shown next to the speech balloon. */
  brandIconUrl: string;
};
