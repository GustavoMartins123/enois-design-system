import { useAdapters } from "../../adapters/adapters-context.js";
import type { UserBadgeProps } from "../../types/domain/badges/user-badge-props.js";

import { OfficialBadge } from "./official-badge.js";
import { isOfficialBadgeId } from "./official-badges.js";

/** One badge of a profile: an official badge id draws in SVG, anything else is an image URL. */
export function UserBadge({ badge, className, alt = "" }: UserBadgeProps) {
  const { resolveMediaUrl } = useAdapters();
  if (isOfficialBadgeId(badge)) {
    return <OfficialBadge badge={badge} className={className} title={alt || undefined} />;
  }
  return <img src={resolveMediaUrl(badge)} alt={alt} className={className} />;
}
