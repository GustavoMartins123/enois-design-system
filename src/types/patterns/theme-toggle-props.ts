import type { ThemeName } from "./theme-name.js";

export type ThemeToggleProps = {
  /** Theme in use now; the button shows its icon and label. */
  theme: ThemeName;
  onToggle: () => void;
};
