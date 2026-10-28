import { cn } from "../../lib/utils.js";
import type { NameplateProps } from "../../types/domain/cosmetics/nameplate-props.js";

import { CosmeticIcon } from "./cosmetic-icon.js";
import { NAMEPLATES } from "./nameplates.js";

/** The name on its plate (member lists, mentions); without a known plate, just the name. */
export function Nameplate({ plate, children, badges, className }: NameplateProps) {
  const art = plate && Object.hasOwn(NAMEPLATES, plate) ? NAMEPLATES[plate] : null;
  return (
    <span
      className={cn("cos-plate", !art && "cos-plate--none", className)}
      style={art ? { background: art.background, color: art.color } : undefined}
      data-nameplate={art ? plate : undefined}
    >
      <span className="cos-plate__name">{children}</span>
      {badges && <span className="cos-plate__badges">{badges}</span>}
      {art && (
        <span className="cos-plate__icons" aria-hidden>
          {art.icons.map((icon) => (
            <CosmeticIcon key={icon} icon={icon} />
          ))}
        </span>
      )}
    </span>
  );
}
