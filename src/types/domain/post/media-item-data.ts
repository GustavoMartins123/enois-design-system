/** A loaded media asset, as the media views read it. */
export type MediaItemData = {
  id: string;
  mimeType: string;
  /** Stored path or URL; the app resolves it through the media adapters. */
  cdnUrl: string | null;
};
