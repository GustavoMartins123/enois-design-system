/** Uma moldura do catálogo, com o preço já formatado pelo app. */
export type FrameShopItem = {
  id: string;
  name: string;
  description: string;
  /** Preço pronto para a tela (ex.: "2"). */
  priceLabel: string;
  owned?: boolean;
  equipped?: boolean;
};
