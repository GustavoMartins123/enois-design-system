import type { CosmeticShopItem } from "./cosmetic-shop-item.js";
import type { ProfileCardData } from "./profile-card-data.js";

export type CosmeticItemArtProps = {
  item: Pick<CosmeticShopItem, "id" | "kind" | "name">;
  /** Whose avatar and name show the item. */
  user: ProfileCardData;
  /** `stage`: the big shop card picture; `thumb`: the small album slot. */
  variant: "stage" | "thumb";
};
