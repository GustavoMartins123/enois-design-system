import type { ReactNode } from "react";

import type { ProfileHtmlFrameProps } from "./profile-html-frame-props.js";
import type { ProfileProject } from "./profile-project.js";
import type { ProjectInput } from "./project-input.js";

export type ProjectsManagerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projects: ProfileProject[];
  savePending?: boolean;
  /** Cria (sem id) ou atualiza; resolve `true` quando gravou, para o editor fechar. */
  onSave: (id: string | undefined, input: ProjectInput) => Promise<boolean>;
  onDelete: (id: string) => void;
  renderHtmlFrame: (props: ProfileHtmlFrameProps) => ReactNode;
};
