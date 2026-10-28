/**
 * Count per reaction type. Keys are partial: the API only returns the types the post has, and the
 * optimistic update drops a key when its counter reaches zero.
 */
export type ReactionCountSummary<T extends string = string> = Partial<Record<T, number>>;
