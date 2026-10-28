/** A footnote sent by the community, waiting for moderation. */
export type AdminPostNoteData = {
  /** Raw id: the row shows `#` plus its last 6 characters. */
  id: string;
  /** Link to the post the note belongs to. */
  postHref: string;
  body: string;
  /** Formatted date and time of creation. */
  createdAtLabel: string;
  authorId: string;
  authorUsername: string | null;
  authorName: string | null;
};
