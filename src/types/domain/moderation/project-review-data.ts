/** A community project waiting for review. */
export type ProjectReviewData = {
  id: string;
  title: string;
  username: string | null;
  category: string | null;
  shortDescription: string | null;
  url: string | null;
  repoUrl: string | null;
};
