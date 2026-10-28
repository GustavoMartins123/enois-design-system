/** Os campos do blog que o diálogo de edição lê (nulo = criação). */
export type BlogEditorData = {
  title: string;
  description?: string | null;
  themeHtml?: string | null;
};
