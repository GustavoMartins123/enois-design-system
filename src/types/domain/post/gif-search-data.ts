import type { GifData } from "./gif-data.js";

export type GifSearchData = {
  items: GifData[];
  /** Há provedor configurado no servidor. */
  available: boolean;
  provider?: string | null;
};
