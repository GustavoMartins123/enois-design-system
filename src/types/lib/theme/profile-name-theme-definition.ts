import type { ProfileNameFont } from "./profile-name-font.js";

export type ProfileNameThemeDefinition = {
  font: ProfileNameFont;
  /** Main colors, first to last (a gradient when there is more than one). */
  colors: string[];
  className: string;
  /** Exact paint of the name (gradient with hard stops, angle...); wins over `colors`. */
  paint?: string;
  /** Font family not covered by the free fonts, with fallbacks; the app loads the web font. */
  fontFamily?: string;
  /** Size relative to the surrounding name (display fonts need a nudge to look the same size). */
  fontSize?: string;
};
