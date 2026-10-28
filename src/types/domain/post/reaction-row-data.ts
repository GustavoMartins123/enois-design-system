/** One person who reacted, with the reaction type. */
export type ReactionRowData<T extends string = string> = {
  userId: string;
  type: T;
};
