/** Estado da publicação automática no LinkedIn, como a tela lê. */
export type LinkedinSyncStatus = {
  postSync: boolean;
  canPost: boolean;
  reason?: string | null;
  lastShareStatus?: string | null;
  /** Data da última tentativa já formatada pelo app. */
  lastShareAtLabel?: string | null;
};
