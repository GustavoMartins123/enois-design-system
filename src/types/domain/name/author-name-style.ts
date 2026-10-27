import type { ProfileNameFont } from "../../lib/theme/profile-name-font.js";
import type { ProfileNameTheme } from "../../lib/theme/profile-name-theme.js";

/**
 * Personalização do nome vinda de qualquer projeção que exibe uma pessoa (post, comentário,
 * notificação, conversa...). Os três campos são opcionais: perfil sem personalização não manda
 * estilo, e o nome sai como sempre.
 */
export type AuthorNameStyle = {
  theme?: ProfileNameTheme | null;
  font?: ProfileNameFont | null;
  color?: string | null;
};
