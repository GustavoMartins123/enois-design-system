export type PostType =
  | "INSIGHT"
  | "ARTICLE"
  | "QUESTION"
  | "PROJECT"
  | "OPPORTUNITY"
  | "PAGE"
  | "NEWS"
  | "TUTORIAL"
  | "REVIEW"
  | "BUSINESS"
  | "DIVERTIDO"
  | "MOMENT"
  /** Ponteiro de um post de blog: o conteúdo mora em /blog/{username}. */
  | "BLOG";
