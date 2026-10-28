import type { GifSearchData } from "./gif-search-data.js";

export type GifPickerDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Recebe a URL da mídia escolhida (ou do link colado no modo alternativo). */
  onSelect: (url: string) => void;
  /** Termo da busca, já com a pausa da digitação (vazio = em alta). */
  onTermChange: (term: string) => void;
  data?: GifSearchData;
  isFetching: boolean;
  isError: boolean;
};
