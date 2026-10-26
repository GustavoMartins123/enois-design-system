import type { ReactNode } from "react";

export type HtmlEditorProps = {
  /** Identificador do campo, para o label apontar para o textarea. */
  id: string;
  value: string;
  onChange: (value: string) => void;
  label: string;
  /** Explicação curta do que roda e do que não roda dentro do quadro. */
  description: string;
  placeholder: string;
  /** Texto do estado vazio da pré-visualização. */
  emptyPreview: string;
  maxLength: number;
  /** Altura do quadro de pré-visualização. */
  previewClassName: string;
  /**
   * The live preview of `value`: the same sandboxed frame the final render uses, so what the author
   * sees here is what readers see later. Shown while the preview is on and the value is not blank.
   */
  preview: ReactNode;
};
