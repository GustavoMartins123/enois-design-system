import type { ReactNode } from "react";

import type { AuthorNameStyle } from "./author-name-style.js";

export type StyledNameProps = {
  name: ReactNode;
  /** Personalização do perfil; nulo/ausente mantém o desenho padrão. */
  style?: AuthorNameStyle | null;
  className?: string;
};
