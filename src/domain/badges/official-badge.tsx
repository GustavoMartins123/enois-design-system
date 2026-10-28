import type { OfficialBadgeProps } from "../../types/domain/badges/official-badge-props.js";
import { CosmeticIcon } from "../cosmetics/cosmetic-icon.js";
import { COSMETIC_ICONS } from "../cosmetics/cosmetic-icons.js";

import { OFFICIAL_BADGE_ICONS, STARRED_OFFICIAL_BADGES } from "./official-badges.js";

/** An official badge drawn in SVG; the caller sizes it like the uploaded badge images. */
export function OfficialBadge({ badge, className, title }: OfficialBadgeProps) {
  if (!Object.hasOwn(OFFICIAL_BADGE_ICONS, badge)) return null;
  return (
    <CosmeticIcon icon={OFFICIAL_BADGE_ICONS[badge]} className={className} title={title}>
      {STARRED_OFFICIAL_BADGES.has(badge) && (
        <g transform="translate(7 -7) scale(0.5)">{COSMETIC_ICONS.estrela}</g>
      )}
    </CosmeticIcon>
  );
}
