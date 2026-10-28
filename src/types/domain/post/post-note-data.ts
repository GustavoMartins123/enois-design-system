import type { AuthorContributorTag } from "../name/author-contributor-tag.js";
import type { AuthorNameStyle } from "../name/author-name-style.js";

/** Nota de rodapé aprovada pela moderação, já pronta para exibir. */
export type PostNoteData = {
  id: string;
  body: string;
  authorName: string;
  /** Personalização do nome do autor (tema/fonte/cor). */
  authorStyle?: AuthorNameStyle | null;
  /** Tag "Contribuinte" quando o autor tem selo ativo. */
  authorContributor?: AuthorContributorTag | null;
  /** Data e hora da nota, já formatadas. */
  createdAtLabel: string;
  /** Perfil do autor; `null` = sem link (conta sem username). */
  authorHref: string | null;
};
