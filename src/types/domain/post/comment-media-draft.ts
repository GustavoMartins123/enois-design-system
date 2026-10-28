/** An attachment waiting in the comment composer. */
export type CommentMediaDraft = {
  type: "image" | "video" | "audio";
  /** Object URL of the local file. */
  preview: string;
};
