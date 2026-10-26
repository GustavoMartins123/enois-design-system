import type { PostType } from "./post-type.js";

/** What the post card reads from a post (the app's post record fits it as is). */
export type PostCardData = {
  id: string;
  type: PostType;
  content: string;
  authorName: string;
  authorAvatar: string | null;
  authorAvatarFrame?: string | null;
  authorBadge?: string | null;
  authorBadges?: string[] | null;
  community?: { name: string; joined: boolean } | null;
  repostOf?: string | null;
  repostOfAuthor?: string | null;
  repostWithOpinion?: boolean;
  repostOfContent?: string | null;
  repostOfMediaIds?: string[] | null;
  pageHtml?: string | null;
  tags: string[];
  mediaIds: string[];
  editedAt?: string | null;
  expiresAt?: string | null;
};
