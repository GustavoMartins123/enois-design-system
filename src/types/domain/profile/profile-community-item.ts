export type ProfileCommunityItem = {
  id: string;
  name: string;
  avatar?: string | null;
  /** Rótulo do tema da comunidade, já traduzido pelo app. */
  topicLabel?: string | null;
  members?: number | null;
  href: string;
};
