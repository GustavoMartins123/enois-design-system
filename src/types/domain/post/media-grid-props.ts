import type { MediaItemData } from "./media-item-data.js";

export type MediaGridProps = {
  /** Loaded media of the post or comment, in order (items without a URL are skipped). */
  items: MediaItemData[];
  /** Encolhe as imagens para espaços apertados (comentários). */
  compact?: boolean;
  mediaSpoiler?: boolean;
  /** Modo lite: vídeo vira convite para o palco em tela cheia. */
  lite?: boolean;
  /** Registers the video in the feed autoplay coordinator once revealed. */
  registerVideoRef?: (element: HTMLVideoElement | null) => (() => void) | undefined;
};
