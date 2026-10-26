/** A contributor application in the moderation queue. */
export type ContributorApplicationData = {
  id: string;
  name: string;
  github: string;
  email: string;
  area: string | null;
  experience: string | null;
  message: string | null;
  /** NEW, REVIEWING, APPROVED or REJECTED; drives the badge and the available actions. */
  status: string;
  /** Formatted submission date and time. */
  createdAtLabel: string;
  /** Formatted date the terms were accepted. */
  acceptedTermsAtLabel: string;
};
