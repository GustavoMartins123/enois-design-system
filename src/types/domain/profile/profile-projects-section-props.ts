import type { ReactNode } from "react";

import type { ProfileHtmlFrameProps } from "./profile-html-frame-props.js";
import type { ProfileProject } from "./profile-project.js";

export type ProfileProjectsSectionProps = {
  projects: ProfileProject[];
  /** Verdadeiro quando o perfil em tela é o próprio — libera o gerenciador. */
  isOwner: boolean;
  onManage: () => void;
  /** Abre a importação do GitHub; sem ele, o botão não aparece. */
  onImport?: () => void;
  renderHtmlFrame: (props: ProfileHtmlFrameProps) => ReactNode;
  /** O gerenciador de projetos e a importação (containers do app), renderizados só para o dono. */
  manager?: ReactNode;
};
