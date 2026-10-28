/** What the comment list needs to build the threads. */
export type PostCommentNode = {
  id: string;
  parentCommentId: string | null;
  authorName: string;
};
