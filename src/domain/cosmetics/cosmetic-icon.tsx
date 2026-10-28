import type { CosmeticIconProps } from "../../types/domain/cosmetics/cosmetic-icon-props.js";

import { COSMETIC_ICONS } from "./cosmetic-icons.js";

/** One icon of the seasonal library in its own 24-unit box. */
export function CosmeticIcon({ icon, className, title, children }: CosmeticIconProps) {
  if (!icon || !Object.hasOwn(COSMETIC_ICONS, icon)) return null;
  return (
    <svg
      viewBox="-12 -12 24 24"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title && <title>{title}</title>}
      {COSMETIC_ICONS[icon]}
      {children}
    </svg>
  );
}
