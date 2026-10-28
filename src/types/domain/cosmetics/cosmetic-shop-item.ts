import type { CosmeticKind } from "./cosmetic-kind.js";

/** A shop item, as the API lists it, with the price already formatted by the app. */
export type CosmeticShopItem = {
  id: string;
  kind: CosmeticKind;
  /** Collection id; `null` for the classic frames that are always on sale. */
  collection: string | null;
  name: string;
  description: string;
  priceLabel: string;
  /** In season. Out of season it is listed but cannot be bought. */
  available: boolean;
  /** `false` for event rewards, never sold. */
  purchasable: boolean;
  owned?: boolean;
  equipped?: boolean;
};
