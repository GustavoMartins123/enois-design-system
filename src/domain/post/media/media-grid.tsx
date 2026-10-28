import { useAdapters } from "../../../adapters/adapters-context.js";
import { useMessages } from "../../../messages/messages-context.js";
import type { MediaGridProps } from "../../../types/domain/post/media-grid-props.js";

import { ImageLightbox } from "./image-lightbox.js";
import { LiteVideo } from "./lite-video.js";
import { SpoilerMedia } from "./spoiler-media.js";

/** Grade de mídias do post (vídeo único ou imagens) com visualização em tela cheia.
 *
 * `compact` encolhe as imagens para caber em espacos apertados (comentarios) sem quebrar
 * a largura em telas pequenas.
 */
export function MediaGrid({
  items: media,
  compact = false,
  mediaSpoiler = false,
  lite = false,
  registerVideoRef,
}: MediaGridProps) {
  const messages = useMessages().mediaGrid;
  const { resolveMediaUrl, resolveMediaOriginalUrl } = useAdapters();
  const items = media.filter((item) => item.cdnUrl);

  if (items.length === 0) return null;

  const isVideo = items.some((m) => m.mimeType.startsWith("video/"));

  // Áudio (gravado no comentário): player com controles, sem autoplay — som que começa sozinho no
  // meio de uma conversa é o oposto do que esta rede quer.
  if (items.some((m) => m.mimeType.startsWith("audio/"))) {
    return (
      <div className="rounded-xl border border-border-soft bg-surface-1 p-2">
        <audio
          src={resolveMediaOriginalUrl(items[0].cdnUrl)}
          controls
          preload="metadata"
          className="w-full"
        />
      </div>
    );
  }

  if (isVideo) {
    return (
      <div className="overflow-hidden rounded-xl border border-border-soft">
        <SpoilerMedia active={mediaSpoiler} label={messages.spoilerReveal}>
          {(revealed) => (
            <LiteVideo
              src={resolveMediaOriginalUrl(items[0].cdnUrl)}
              registerRef={revealed ? registerVideoRef : undefined}
              lite={lite}
            />
          )}
        </SpoilerMedia>
      </div>
    );
  }

  return (
    <>
      <SpoilerMedia active={mediaSpoiler} label={messages.spoilerReveal}>
        {() => (
          <div
            className={`grid gap-2 ${items.length === 1 ? "grid-cols-1" : "grid-cols-2"} ${
              compact ? "max-w-[280px]" : ""
            }`}
          >
            {items.map((m) => (
              <ImageLightbox key={m.id} src={resolveMediaUrl(m.cdnUrl)}>
                <button
                  type="button"
                  aria-label={messages.openImage}
                  className="cursor-zoom-in overflow-hidden rounded-xl border border-border-soft bg-surface-1 text-left"
                >
                  <img
                    src={resolveMediaUrl(m.cdnUrl)}
                    alt=""
                    loading="lazy"
                    className={
                      items.length === 1
                        ? `h-auto w-full object-contain ${compact ? "max-h-[280px]" : "max-h-[36rem]"}`
                        : "aspect-square w-full object-contain"
                    }
                  />
                </button>
              </ImageLightbox>
            ))}
          </div>
        )}
      </SpoilerMedia>
    </>
  );
}
