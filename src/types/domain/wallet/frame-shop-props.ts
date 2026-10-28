import type { FrameShopItem } from "./frame-shop-item.js";
import type { FrameShopOrder } from "./frame-shop-order.js";
import type { FrameShopUser } from "./frame-shop-user.js";

export type FrameShopProps = {
  onlyOwned?: boolean;
  /** Catálogo na ordem pedida; `undefined` enquanto carrega ou quando falhou. */
  items?: FrameShopItem[];
  loading?: boolean;
  error?: boolean;
  onRetry: () => void;
  user?: FrameShopUser;
  order: FrameShopOrder;
  onOrderChange: (order: FrameShopOrder) => void;
  /** Compra ou equipamento em andamento: os botões de ação ficam desabilitados. */
  actionPending?: boolean;
  onBuy: (id: string) => void;
  /** Equipa a moldura; `"none"` desequipa a atual. */
  onEquip: (id: string) => void;
};
