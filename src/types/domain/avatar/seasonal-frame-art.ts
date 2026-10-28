import type { ReactNode } from "react";

/**
 * The drawing of a seasonal frame inside `viewBox="-80 -80 160 160"` (avatar radius 50).
 * `id` is unique per rendered frame, for the few drawings that need SVG ids (text paths).
 */
export type SeasonalFrameArt = (id: string) => ReactNode;
