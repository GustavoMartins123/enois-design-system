import type { CosmeticKind } from "./cosmetic-kind.js";

export type CosmeticShopFilter = {
  /** Collection tab; `null` lists the classic items without a collection. */
  collection: string | null;
  kind: CosmeticKind | "ALL";
  /** Search text: when present it looks into every collection. */
  query: string;
};
