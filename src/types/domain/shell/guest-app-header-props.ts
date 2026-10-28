import type { ReactNode } from "react";

export type GuestAppHeaderProps = {
  /** Where the brand navigates. */
  homeHref: string;
  /** Where the "Entrar" button navigates. */
  loginHref: string;
  /** Theme toggle slot. */
  themeToggle: ReactNode;
};
