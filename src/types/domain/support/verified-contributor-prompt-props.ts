import type { ReactNode } from "react";

export type VerifiedContributorPromptProps = {
  /** The contributor data is already confirmed: shows the confirmed card instead of the form. */
  confirmed: boolean;
  /** The verified-mode ContributionForm, shown when the prompt is expanded. */
  form?: ReactNode;
};
