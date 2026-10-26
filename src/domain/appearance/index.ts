export {
  PAGE_PAINT_TARGETS,
  WIDGET_PAINT_TARGETS,
  backgroundValue,
  buildPageDeclarations,
  buildWidgetDeclarations,
  effectiveAlpha,
  pageRepresentative,
  paintGradientCss,
  representativeHex,
  withAlpha,
} from "../../lib/theme/build-background-style.js";
export { buildCollectionCss } from "../../lib/theme/build-collection-css.js";
export {
  buildAccentTokens,
  buildThemeColor,
  buildThemeCss,
  buildThemeTokens,
  clampThemeSettings,
  isDefaultThemeSettings,
  reportThemeContrast,
  sameThemeSettings,
} from "../../lib/theme/build-theme-tokens.js";
export {
  classifyContrast,
  contrastRatio,
  hexToHsl,
  hexToRgb,
  hslToHex,
  oklch,
  oklchToHex,
  oklchToRgb,
  readableForeground,
  relativeLuminance,
  rgbToHex,
  textSafeAccent,
} from "../../lib/theme/color.js";
export {
  GALLERY_COLLECTION_PREFIX,
  buildGalleryCollection,
  galleryCollectionId,
  isGalleryCollectionId,
} from "../../lib/theme/gallery-collection.js";
export {
  PROFILE_NAME_COLORS,
  PROFILE_NAME_FONTS,
  PROFILE_NAME_THEMES,
  profileNameFontFamily,
  profileNameTheme,
  profileNameThemePaint,
} from "../../lib/theme/profile-name-fonts.js";
export { THEME_COLLECTIONS, THEME_COLLECTION_IDS } from "../../lib/theme/theme-collections.js";
export {
  DEFAULT_THEME_SETTINGS,
  FIXED_THEME_COLORS,
  THEME_LIMITS,
} from "../../lib/theme/theme-defaults.js";
export { THEME_PRESET_IDS } from "../../lib/theme/theme-preset-ids.js";
export { THEME_PRESETS } from "../../lib/theme/theme-presets.js";
export { THEME_TOKEN_NAMES } from "../../lib/theme/theme-tokens.js";
export type { BackgroundStyle } from "../../types/lib/theme/background-style.js";
export type { GalleryThemePackage } from "../../types/lib/theme/gallery-theme-package.js";
export type { ProfileNameFont } from "../../types/lib/theme/profile-name-font.js";
export type { ProfileNameStyle } from "../../types/lib/theme/profile-name-style.js";
export type { ProfileNameTheme } from "../../types/lib/theme/profile-name-theme.js";
export type { RgbColor } from "../../types/lib/theme/rgb-color.js";
export type { ThemeAccent } from "../../types/lib/theme/theme-accent.js";
export type { ThemeBackground } from "../../types/lib/theme/theme-background.js";
export type { CollectionOverrides } from "../../types/lib/theme/theme-collection-overrides.js";
export type { PaletteSpec } from "../../types/lib/theme/theme-collection-palette-spec.js";
export type { ThemeCollectionPreview } from "../../types/lib/theme/theme-collection-preview.js";
export type { ThemeCollectionTokens } from "../../types/lib/theme/theme-collection-tokens.js";
export type { ThemeCollection } from "../../types/lib/theme/theme-collection.js";
export type { ThemeContrastLevel } from "../../types/lib/theme/theme-contrast-level.js";
export type { ThemeContrastReport } from "../../types/lib/theme/theme-contrast-report.js";
export type { ThemePresetId } from "../../types/lib/theme/theme-preset-id.js";
export type { ThemePreset } from "../../types/lib/theme/theme-preset.js";
export type { ThemeSettings } from "../../types/lib/theme/theme-settings.js";
export type { ThemeTokenMap } from "../../types/lib/theme/theme-token-map.js";
export type { ThemeTokenName } from "../../types/lib/theme/theme-token-name.js";
export type { Theme } from "../../types/lib/theme/theme.js";
