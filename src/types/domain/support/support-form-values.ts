/** The help request as typed: the app trims it and opens the ticket. */
export type SupportFormValues = {
  subject: string;
  message: string;
  contactEmail: string;
  category: string;
  imageUrl: string | null;
};
