/** Um tema comprado na loja, já filtrado (sem reembolsados) e sem repetição por item. */
export type PurchasedTheme = {
  itemId: string;
  /** `null` mostra o rótulo genérico de aplicar. */
  title: string | null;
};
