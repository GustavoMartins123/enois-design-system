import type { ReactNode } from "react";

import type { ProfileHtmlFrameProps } from "./profile-html-frame-props.js";
import type { ProfileProject } from "./profile-project.js";

export type ProfileProjectsSectionProps = {
  projects: ProfileProject[];
  /** Verdadeiro quando o perfil em tela é o próprio — libera o gerenciador. */
  isOwner: boolean;
  onManage: () => void;
  renderHtmlFrame: (props: ProfileHtmlFrameProps) => ReactNode;
  /** O gerenciador de projetos (container do app), renderizado só para o dono. */
  manager?: ReactNode;
};
