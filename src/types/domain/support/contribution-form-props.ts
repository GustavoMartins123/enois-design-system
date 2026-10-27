import type { ContributionFormInitial } from "./contribution-form-initial.js";
import type { ContributionFormMode } from "./contribution-form-mode.js";
import type { ContributionFormValues } from "./contribution-form-values.js";

export type ContributionFormProps = {
  /** Where the terms link points. */
  termsHref: string;
  /** Records the application; resolves `null` when sent, or the error message to show. */
  onSubmit: (values: ContributionFormValues) => Promise<string | null>;
  /** Defaults to "landing". */
  mode?: ContributionFormMode;
  initial?: ContributionFormInitial;
};
