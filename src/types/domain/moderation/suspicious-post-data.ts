/** A reported post with a high pre-screening score. */
export type SuspiciousPostData = {
  postId: string;
  reportId: string;
  score: number;
  reason: string;
  /** Pre-screening signal codes; the view shows their labels. */
  signals: string[];
  /** Where the post opens. */
  href: string;
};
