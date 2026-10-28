import type { AuthorNameStyle } from "../name/author-name-style.js";

export type ProfileNetworkPerson = {
  id: string;
  username: string;
  name: string;
  /** Personalização do nome (tema/fonte/cor). */
  nameStyle?: AuthorNameStyle | null;
  headline: string | null;
  avatar: string | null;
  avatarFrame: string | null;
  href: string;
};
