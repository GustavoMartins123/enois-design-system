/** Os campos do jogo que a página do jogo exibe. */
export type GameDetailData = {
  id: string;
  username?: string | null;
  title: string;
  description?: string | null;
  cover?: string | null;
  url: string;
  status: string;
  genres: string[];
  languages: string[];
  controls?: string | null;
  requirements?: string | null;
  contentWarnings?: string | null;
  stage: string;
  distribution: string;
  priceCoins: number;
  version?: string | null;
  mediaIds: string[];
  icon?: string | null;
  banner?: string | null;
  bannerHtml?: string | null;
};
