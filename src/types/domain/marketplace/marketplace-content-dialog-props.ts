import type { MarketplaceContentData } from "./marketplace-content-data.js";

export type MarketplaceContentDialogProps = {
  /** Título da compra (nome do arquivo baixado e reserva do título do diálogo). */
  title: string | null | undefined;
  /** O conteúdo carregado (ausente enquanto carrega ou quando falhou). */
  data?: MarketplaceContentData;
  loading?: boolean;
  error?: boolean;
  onClose: () => void;
};
