import type { WithRequiredChildren } from "../../components/with-required-children.js";

export type EditProfileFieldProps = WithRequiredChildren<{
  label: string;
  error?: string;
}>;
