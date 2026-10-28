import type { ReactNode } from "react";

import type { ProfileHtmlFrameProps } from "./profile-html-frame-props.js";

export type ProfileBioDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** HTML atual da bio (nulo quando a pessoa usa a bio de texto). */
  initialHtml: string | null;
  /** Teto do HTML/CSS, em caracteres. */
  maxLength: number;
  savePending?: boolean;
  onSave: (html: string) => void;
  /** Desenha a pré-visualização no quadro isolado do app. */
  renderHtmlFrame: (props: ProfileHtmlFrameProps) => ReactNode;
};
