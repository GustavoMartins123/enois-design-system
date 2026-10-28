import type { ThemeSellValues } from "./theme-sell-values.js";

export type ThemeSellDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Nome sugerido ao abrir (o da coleção ativa, ou vazio). */
  defaultName: string;
  /** Lê o preço digitado em milésimos de faísca; `null` quando não dá para ler. */
  parsePrice: (text: string) => number | null;
  /** Milésimos de faísca → texto para leitura. */
  formatPrice: (value: number) => string;
  pending?: boolean;
  onSubmit: (values: ThemeSellValues) => void;
};
