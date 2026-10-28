/** A ready outfit of one collection: every slot of the card at once. */
export type CosmeticShopLook = {
  id: string;
  title: string;
  /** Item ids: theme, frame, name style, effect, banner, plate, badges. */
  items: string[];
  statusIcon?: string | null;
  statusText?: string | null;
  /** Price of the missing items with the look discount, formatted by the app. */
  priceLabel?: string | null;
};
