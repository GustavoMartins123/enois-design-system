/** A reaction tab: the type and how many people reacted with it. */
export type ReactionTab<T extends string = string> = {
  type: T;
  count: number;
};
