import type { ThemePresetId } from "./theme-preset-id.js";
import type { ThemeSettings } from "./theme-settings.js";

export type ThemePreset = {
  id: ThemePresetId;
  settings: ThemeSettings;
};
