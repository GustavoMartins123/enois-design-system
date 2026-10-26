import type { ComponentPropsWithoutRef } from "react";

export type EditProfileSubField = {
  key: string;
  label: string;
  required?: boolean;
  multiline?: boolean;
  type?: ComponentPropsWithoutRef<"input">["type"];
};
