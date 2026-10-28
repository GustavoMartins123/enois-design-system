import type { ReactNode } from "react";

import type { ProfileHtmlFrameProps } from "../profile/profile-html-frame-props.js";

import type { BlogEditorData } from "./blog-editor-data.js";
import type { BlogEditorValues } from "./blog-editor-values.js";

export type BlogEditorDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Blog existente (edição) ou null (criação). */
  blog: BlogEditorData | null;
  pending?: boolean;
  /** Erro da última gravação (o app limpa ao reabrir). */
  error?: string | null;
  onSave: (values: BlogEditorValues) => void;
  /** Desenha a pré-visualização do tema no quadro isolado do app. */
  renderHtmlFrame: (props: ProfileHtmlFrameProps) => ReactNode;
};
