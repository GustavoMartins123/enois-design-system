import { Globe } from "lucide-react";

import { safeHref } from "../../lib/safe-href.js";
import type { CompanyWebsiteLinkProps } from "../../types/domain/jobs/company-website-link-props.js";

/** The company's site as a link, only when the stored value is a safe href; otherwise nothing. */
export function CompanyWebsiteLink({ website }: CompanyWebsiteLinkProps) {
  const href = safeHref(website);
  if (!href || !website) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-primary hover:underline"
    >
      <Globe className="h-3.5 w-3.5" />
      {website.replace(/^https?:\/\//, "")}
    </a>
  );
}
