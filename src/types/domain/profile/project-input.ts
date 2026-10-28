/** Corpo de criação/edição de um card de projeto (o id vai na URL). */
export type ProjectInput = {
  title: string;
  description?: string | null;
  stack: string[];
  repoUrl: string | null;
  status: string | null;
  diary: { date: string; text: string }[];
  html: string | null;
};
