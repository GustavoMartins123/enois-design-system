/** Os campos da ficha que o diálogo de edição lê do jogo carregado. */
export type GameEditorData = {
  username?: string | null;
  slug: string;
  title: string;
  url: string;
  tags?: string | null;
  shortDescription?: string | null;
  description?: string | null;
  genres: string[];
  languages: string[];
  controls?: string | null;
  requirements?: string | null;
  contentWarnings?: string | null;
  stage: string;
  distribution: string;
  priceCoins?: number | null;
  aspect: string;
  version?: string | null;
  websiteUrl?: string | null;
  supportUrl?: string | null;
  icon?: string | null;
  banner?: string | null;
  bannerHtml?: string | null;
  status: string;
};
