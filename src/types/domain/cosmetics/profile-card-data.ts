import type { AuthorNameStyle } from "../name/author-name-style.js";

/** What a profile card shows. Every cosmetic is optional: without them the card uses the theme. */
export type ProfileCardData = {
  name: string;
  username?: string | null;
  pronouns?: string | null;
  avatar?: string | null;
  avatarFrame?: string | null;
  nameStyle?: AuthorNameStyle | null;
  /** Badge list: official badge ids (`emblema-*`) and uploaded image URLs. */
  badges?: (string | null)[] | null;
  /** Legacy single badge, used when `badges` is empty. */
  badge?: string | null;
  bio?: string | null;
  /** Uploaded banner photo URL. */
  banner?: string | null;
  /** Equipped official banner id (`banner-*`). */
  bannerItem?: string | null;
  cardTheme?: string | null;
  nameplate?: string | null;
  profileEffect?: string | null;
  statusText?: string | null;
  /** Cosmetic icon key of the status bubble. */
  statusIcon?: string | null;
};
