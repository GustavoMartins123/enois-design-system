import type { ContributionFormValues } from "./contribution-form-values.js";

export type ContributionFormProps = {
  /** Where the terms link points. */
  termsHref: string;
  /** Records the application; resolves `null` when sent, or the error message to show. */
  onSubmit: (values: ContributionFormValues) => Promise<string | null>;
};
