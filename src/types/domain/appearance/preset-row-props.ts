import type { ThemePresetId } from "../../lib/theme/theme-preset-id.js";
import type { ThemeSettings } from "../../lib/theme/theme-settings.js";

export type PresetRowProps = {
  /** Paleta atual, ou `null` quando o usuário já ajustou algo à mão. */
  activeId: ThemePresetId | null;
  onSelect: (settings: ThemeSettings) => void;
};
