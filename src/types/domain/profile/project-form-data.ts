/** Os campos do projeto que o diálogo usa para semear a ficha. */
export type ProjectFormData = {
  title: string;
  shortDescription?: string | null;
  description?: string | null;
  url?: string | null;
  repoUrl?: string | null;
  tags?: string | null;
  category?: string | null;
  slug: string;
  cover?: string | null;
};
