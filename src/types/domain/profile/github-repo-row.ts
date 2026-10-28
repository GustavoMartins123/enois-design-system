/** Um repositório público do GitHub na lista de importação. */
export type GithubRepoRow = {
  name: string;
  /** "dono/nome": a chave da seleção. */
  fullName: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  fork: boolean;
  archived: boolean;
  updatedAtLabel: string | null;
  url: string;
};
