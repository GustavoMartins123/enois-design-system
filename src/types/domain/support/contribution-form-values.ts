/** The contributor application as typed: the app trims it and records it. */
export type ContributionFormValues = {
  name: string;
  github: string;
  email: string;
  area: string;
  experience: string;
  message: string;
  acceptedTerms: boolean;
};
