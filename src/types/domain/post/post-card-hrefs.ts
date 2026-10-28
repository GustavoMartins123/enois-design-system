export type PostCardHrefs = {
  /** Profile of the identity that signed the post. */
  author: string;
  /** The post page ("Ler mais", article); may carry the feed tab to come back to. */
  post: string;
  community?: string | null;
  /** The original post of a repost. */
  repostOf?: string | null;
  /** The blog post a BLOG pointer leads to. */
  blog?: string | null;
};
