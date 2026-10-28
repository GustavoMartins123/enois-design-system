import type { CosmeticKind } from "./cosmetic-kind.js";

/**
 * Items being tried on in the shop preview, by kind (nothing is bought). `badges` replaces the
 * badge list when a look is tried; `look` names that look.
 */
export type CosmeticTryOn = {
  items: Partial<Record<CosmeticKind, string>>;
  badges: string[] | null;
  look: string | null;
  statusIcon: string | null;
  statusText: string | null;
};
