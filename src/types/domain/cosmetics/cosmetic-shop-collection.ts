import type { CosmeticShopLook } from "./cosmetic-shop-look.js";

export type CosmeticShopCollection = {
  id: string;
  name: string;
  /** In season today. */
  available: boolean;
  looks: CosmeticShopLook[];
  /** Short season label for the tab (`31 out`, `dez`...). */
  dateLabel?: string | null;
};
