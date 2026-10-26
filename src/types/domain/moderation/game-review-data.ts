/** A community game waiting for review. */
export type GameReviewData = {
  id: string;
  userId: string;
  username: string | null;
  title: string;
  description: string;
  cover: string;
  url: string;
  tags: string;
  aspect: string | null;
  /** Formatted submission date, when there is one. */
  submittedAtLabel: string | null;
};
