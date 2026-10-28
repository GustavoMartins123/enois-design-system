import type { FreeProfileNameTheme } from "../../types/lib/theme/free-profile-name-theme.js";
import type { ProfileNameFont } from "../../types/lib/theme/profile-name-font.js";
import type { ProfileNameStyle } from "../../types/lib/theme/profile-name-style.js";
import type { ProfileNameThemeDefinition } from "../../types/lib/theme/profile-name-theme-definition.js";
import type { ProfileNameTheme } from "../../types/lib/theme/profile-name-theme.js";

import { SEASONAL_NAME_THEMES } from "./seasonal-name-themes.js";

export const PROFILE_NAME_FONTS: Record<ProfileNameFont, string> = {
  SYSTEM: "ui-sans-serif, system-ui, sans-serif",
  SERIF: 'Georgia, "Times New Roman", serif',
  MONO: '"Courier New", Courier, monospace',
  ROUNDED: '"Trebuchet MS", ui-sans-serif, sans-serif',
  DISPLAY: 'Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif',
  PIXEL: '"Press Start 2P", "Courier New", monospace',
  GOTHIC: '"UnifrakturCook", "Old English Text MT", Georgia, serif',
  CURSIVE: '"Brush Script MT", "Segoe Script", "Apple Chancery", cursive',
  CONDENSED: '"Arial Narrow", "Liberation Sans Narrow", "Helvetica Neue", sans-serif',
  COMIC: '"Comic Sans MS", "Comic Neue", "Chalkboard SE", cursive',
  SLAB: 'Rockwell, "Roboto Slab", "Courier New", Georgia, serif',
};

export const PROFILE_NAME_COLORS = ["#ff7a18", "#ff4fa3", "#8b5cf6", "#22c55e", "#0ea5e9"];

/** The free themes, in the order the appearance settings show them. */
export const FREE_PROFILE_NAME_THEMES: readonly FreeProfileNameTheme[] = [
  "DEFAULT",
  "PIXEL",
  "GOTHIC",
  "NEON",
  "GLITCH",
  "CANDY",
  "RETRO",
  "OCEAN",
  "SUNSET",
  "MATRIX",
  "GOLD",
  "ICE",
];

/** Free themes plus the seasonal ones of the cosmetics shop (keyed by catalog id, `nome-*`). */
export const PROFILE_NAME_THEMES: Record<ProfileNameTheme, ProfileNameThemeDefinition> = {
  DEFAULT: { font: "SYSTEM", colors: ["#ff7a18"], className: "" },
  PIXEL: { font: "PIXEL", colors: ["#9cff57", "#36d98a"], className: "profile-name-theme-pixel" },
  GOTHIC: {
    font: "GOTHIC",
    colors: ["#e7c6ff", "#9b5de5"],
    className: "profile-name-theme-gothic",
  },
  NEON: {
    font: "DISPLAY",
    colors: ["#ff4fa3", "#8b5cf6", "#0ea5e9"],
    className: "profile-name-theme-neon",
  },
  GLITCH: { font: "MONO", colors: ["#22d3ee", "#ff4fa3"], className: "profile-name-theme-glitch" },
  CANDY: {
    font: "ROUNDED",
    colors: ["#ff7ab6", "#ffc6ff", "#ffd166"],
    className: "profile-name-theme-candy",
  },
  RETRO: {
    font: "ROUNDED",
    colors: ["#f59e0b", "#ef4444"],
    className: "profile-name-theme-retro",
  },
  OCEAN: {
    font: "SERIF",
    colors: ["#0ea5e9", "#22d3ee"],
    className: "profile-name-theme-ocean",
  },
  SUNSET: {
    font: "DISPLAY",
    colors: ["#fb7185", "#f59e0b"],
    className: "profile-name-theme-sunset",
  },
  MATRIX: {
    font: "MONO",
    colors: ["#22c55e", "#86efac"],
    className: "profile-name-theme-matrix",
  },
  GOLD: {
    font: "DISPLAY",
    colors: ["#facc15", "#b45309"],
    className: "profile-name-theme-gold",
  },
  ICE: {
    font: "SERIF",
    colors: ["#7dd3fc", "#e0f2fe"],
    className: "profile-name-theme-ice",
  },
  ...SEASONAL_NAME_THEMES,
};

export function profileNameFontFamily(font: ProfileNameStyle["font"] | null | undefined): string {
  return PROFILE_NAME_FONTS[font ?? "SYSTEM"];
}

/** The theme definition; an unknown theme (newer server, older client) falls back to DEFAULT. */
export function profileNameTheme(
  theme: ProfileNameTheme | null | undefined,
): ProfileNameThemeDefinition {
  if (theme && Object.hasOwn(PROFILE_NAME_THEMES, theme)) return PROFILE_NAME_THEMES[theme];
  return PROFILE_NAME_THEMES.DEFAULT;
}

/**
 * The paint of the name. A chosen color replaces the first color of a free theme; a seasonal
 * theme with an exact paint is the item itself and ignores it.
 */
export function profileNameThemePaint(
  theme: ProfileNameTheme | null | undefined,
  color?: string | null,
): string {
  const definition = profileNameTheme(theme);
  if (definition.paint) return definition.paint;
  const colors = color ? [color, ...definition.colors.slice(1)] : definition.colors;
  return colors.length > 1 ? `linear-gradient(90deg, ${colors.join(", ")})` : colors[0];
}

/** The font of the name: the chosen font, else the theme's own family, else its default font. */
export function profileNameThemeFontFamily(
  theme: ProfileNameTheme | null | undefined,
  font?: ProfileNameFont | null,
): string {
  if (font) return profileNameFontFamily(font);
  const definition = profileNameTheme(theme);
  return definition.fontFamily ?? profileNameFontFamily(definition.font);
}
