import type { AuthorNameStyle } from "../name/author-name-style.js";

/** What the comment row reads from a comment (the app's comment record fits it as is). */
export type CommentItemData = {
  authorName: string;
  /** Personalização do nome do autor (tema/fonte/cor). */
  authorStyle?: AuthorNameStyle | null;
  authorAvatar: string | null;
  authorAvatarFrame?: string | null;
  authorBadge?: string | null;
  authorBadges?: string[] | null;
  mediaIds?: string[];
  mediaSpoiler?: boolean;
  reactionCount?: number;
  pinned?: boolean;
};
