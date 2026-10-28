import type { SeasonalFrameRange } from "./seasonal-frame-range.js";

/** Options of the `orbit` frame generator (icons spread around the avatar). */
export type SeasonalOrbitOptions = {
  /** Motion of the whole group; empty for a still group. */
  spin?: string;
  /** Spread along this arc instead of the whole circle. */
  arc?: SeasonalFrameRange;
  /** Turn each icon to follow the circle. */
  rotate?: boolean;
  rotOff?: number;
  /** Motion of each icon. */
  each?: string;
  /** Delay between the icons' motion, in seconds. */
  stagger?: number;
  /** Random radius offset. */
  jitter?: number;
  seed?: number;
};
