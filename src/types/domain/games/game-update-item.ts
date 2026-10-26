/** Uma novidade do criador, com a data já formatada pelo app. */
export type GameUpdateItem = {
  id: string;
  title: string;
  body?: string | null;
  version?: string | null;
  dateLabel: string;
};
