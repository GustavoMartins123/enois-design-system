import type { ReactNode } from "react";

import type { ProfileHtmlFrameProps } from "./profile-html-frame-props.js";

export type ProfileBannerDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** HTML atual da capa (nulo quando a pessoa usa a foto ou o degradê padrão). */
  initialHtml: string | null;
  /** Abre o seletor de arquivo da foto: a capa continua tendo as duas formas. */
  onPickPhoto: () => void;
  /** Teto do HTML/CSS, em caracteres. */
  maxLength: number;
  savePending?: boolean;
  /** Grava a capa em HTML; string vazia volta para a foto. */
  onSave: (html: string) => void;
  /** Desenha a pré-visualização no quadro isolado do app. */
  renderHtmlFrame: (props: ProfileHtmlFrameProps) => ReactNode;
};
