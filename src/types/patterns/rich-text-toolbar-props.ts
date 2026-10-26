import type { RichTextFormat } from "../lib/rich-text/rich-text-format.js";

export type RichTextToolbarProps = {
  onFormat: (format: RichTextFormat) => void;
  /** Rótulo acessível do grupo de botões. */
  label: string;
  className?: string;
  /**
   * Recebe o emoji escolhido no seletor. Sem esta função a barra não mostra o botão de emoji —
   * é assim que um campo que não aceita emoji (ou que já tem o seu) fica sem ele.
   */
  onEmoji?: (emoji: string) => void;
};
