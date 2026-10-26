import type { ProfileNameFont } from "../../lib/theme/profile-name-font.js";
import type { ProfileNameTheme } from "../../lib/theme/profile-name-theme.js";

/** Estilo do nome já escolhido (preferência local ou o do perfil); `null` = o padrão do tema. */
export type AppearanceNameStyleSelection = {
  theme: ProfileNameTheme | null;
  font: ProfileNameFont | null;
  color: string | null;
};
