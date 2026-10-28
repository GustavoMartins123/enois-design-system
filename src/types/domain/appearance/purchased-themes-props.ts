import type { PurchasedTheme } from "./purchased-theme.js";

export type PurchasedThemesProps = {
  themes: PurchasedTheme[];
  /** Item sendo aplicado agora: trava os botões e mostra o spinner nele. */
  applyingItemId?: string | null;
  onApply: (itemId: string) => void;
};
