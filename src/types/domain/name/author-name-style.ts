import type { ProfileNameFont } from "../../lib/theme/profile-name-font.js";
import type { ProfileNameTheme } from "../../lib/theme/profile-name-theme.js";

/**
 * Personalização do nome vinda de qualquer projeção que exibe uma pessoa (post, comentário,
 * notificação, conversa...). Todos os campos são opcionais: perfil sem personalização não manda
 * estilo, e o nome sai como sempre.
 */
export type AuthorNameStyle = {
  theme?: ProfileNameTheme | null;
  font?: ProfileNameFont | null;
  color?: string | null;
  /** Equipped nameplate (`placa-*`): the name sits on its plate wherever it shows. */
  nameplate?: string | null;
};
