/** O estado do formulário de edição, sem tratamento: o app apara e monta o PATCH. */
export type GameEditorValues = {
  title: string;
  slug: string;
  url: string;
  tags: string;
  shortDescription: string;
  description: string;
  genres: string;
  languages: string;
  controls: string;
  requirements: string;
  contentWarnings: string;
  stage: string;
  distribution: string;
  priceCoins: string;
  aspect: string;
  version: string;
  websiteUrl: string;
  supportUrl: string;
  icon: string | null;
  banner: string | null;
  bannerHtml: string;
};
