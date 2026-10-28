import type { CommunityChannelData } from "./community-channel-data.js";
import type { CommunityChannelValues } from "./community-channel-values.js";
import type { CommunityTopicOption } from "./community-topic-option.js";

export type CommunityChannelsProps = {
  /** Only members see (and create) channels. */
  joined: boolean;
  loading: boolean;
  channels: CommunityChannelData[];
  topics: CommunityTopicOption[];
  createPending?: boolean;
  /** Creates the channel; resolves `null` when created (the dialog closes), or the error message. */
  onCreate: (values: CommunityChannelValues) => Promise<string | null>;
};
