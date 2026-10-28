import type { MarketplaceSellValues } from "./marketplace-sell-values.js";

export type MarketplaceSellDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Categorias que entregam conteúdo, como `[valor, rótulo]` (o catálogo é do app). */
  kindOptions: readonly (readonly [string, string])[];
  /** Lê o preço digitado em milésimos de faísca; `null` quando não dá para ler. */
  parsePrice: (text: string) => number | null;
  pending?: boolean;
  onSubmit: (values: MarketplaceSellValues) => void;
};
