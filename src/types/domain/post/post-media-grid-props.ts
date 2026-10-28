/** Media grid as a post view asks the app to render it (the app loads the media by id). */
export type PostMediaGridProps = {
  mediaIds: string[];
  compact?: boolean;
  mediaSpoiler?: boolean;
};
