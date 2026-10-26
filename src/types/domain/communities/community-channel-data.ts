/** A private channel in the community's channel grid. */
export type CommunityChannelData = {
  id: string;
  name: string;
  /** Where the channel card leads. */
  href: string;
  topicLabel?: string | null;
  description?: string | null;
};
