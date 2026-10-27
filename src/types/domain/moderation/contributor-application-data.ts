/** A contributor in the moderation panel: a landing application or a GitHub-verified contributor. */
export type ContributorApplicationData = {
  /** `null` for a verified contributor who has not filled the form yet. */
  id: string | null;
  name: string;
  github: string;
  email: string | null;
  area: string | null;
  experience: string | null;
  message: string | null;
  /** NEW, REVIEWING, APPROVED or REJECTED; drives the badge and the available actions. */
  status: string;
  /** Approved by verified GitHub contributions: no manual review. */
  githubVerified: boolean;
  /** Verified, but still has to confirm the data through the form. */
  formPending: boolean;
  sealName: string | null;
  evidenceCount: number | null;
  /** Formatted submission date and time. */
  createdAtLabel: string;
  /** Formatted date the terms were accepted, when they were. */
  acceptedTermsAtLabel: string | null;
};
