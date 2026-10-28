import type { AuthorContributorTag } from "../name/author-contributor-tag.js";
import type { AuthorNameStyle } from "../name/author-name-style.js";

export type AuthorInfoProps = {
  authorName: string;
  /** Personalização do nome do autor (tema/fonte/cor). */
  authorStyle?: AuthorNameStyle | null;
  /** Tag "Contribuinte" quando o autor tem selo ativo; ausente = não é contribuinte. */
  authorContributor?: AuthorContributorTag | null;
  authorAvatar: string | null;
  authorAvatarFrame?: string | null;
  authorBadge?: string | null;
  authorBadges?: string[] | null;
  /** Perfil da identidade que assinou (social ou profissional). */
  authorHref: string;
  /** Tempo relativo da publicação ("há 5 min"). */
  timeLabel: string;
  community?: { name: string; joined: boolean; href: string } | null;
  fallbackClassName?: string;
  /** Chamado quando o leitor aperta "Seguir" na comunidade do post. */
  onFollowCommunity?: () => void;
  followPending?: boolean;
};
