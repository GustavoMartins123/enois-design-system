import type { ReactNode } from "react";

import type { WithRequiredChildren } from "../../components/with-required-children.js";

import type { LegalLayoutHrefs } from "./legal-layout-hrefs.js";

export type LegalLayoutProps = WithRequiredChildren<{
  /** Year shown in the footer copyright. */
  year: number;
  hrefs: LegalLayoutHrefs;
  /** Theme toggle slot in the header. */
  themeToggle: ReactNode;
}>;
