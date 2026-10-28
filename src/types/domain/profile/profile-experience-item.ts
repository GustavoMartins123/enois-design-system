/** Uma posição da trajetória, com as datas já formatadas pelo app (no fuso dele). */
export type ProfileExperienceItem = {
  id: string;
  title: string;
  company: string;
  location?: string | null;
  description?: string | null;
  currentlyHere?: boolean | null;
  /** Início formatado ("jan. 2023"); `null` sem data de início. */
  startLabel: string | null;
  /** Fim formatado; `null` sem data de fim. */
  endLabel: string | null;
  /** Meses inclusivos entre início e fim (ou hoje); `null` sem data de início. */
  months: number | null;
};
