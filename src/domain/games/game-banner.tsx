import { useAdapters } from "../../adapters/adapters-context.js";
import { useMessages } from "../../messages/messages-context.js";
import type { GameBannerProps } from "../../types/domain/games/game-banner-props.js";

/**
 * Banner do topo da página do jogo: FOTO ou HTML/CSS editável — as duas opções, como no banner
 * do perfil. A foto vence quando as duas existem; o HTML roda no mesmo quadro isolado do resto do
 * app (sem script, sem rede), porque é conteúdo colado pelo criador.
 */
export function GameBanner({ banner, bannerHtml, title, renderHtmlFrame }: GameBannerProps) {
  const { resolveMediaUrl } = useAdapters();
  const messages = useMessages().gameBanner;

  if (banner) {
    return (
      <img
        src={resolveMediaUrl(banner)}
        alt=""
        className="h-32 w-full rounded-2xl object-cover sm:h-44"
      />
    );
  }

  if (bannerHtml) {
    return (
      <div className="h-32 w-full overflow-hidden rounded-2xl border border-border-soft sm:h-44">
        {renderHtmlFrame({
          html: bannerHtml,
          title: messages.frameTitle(title),
          className: "h-full",
          innerPadding: false,
          autoHeight: false,
        })}
      </div>
    );
  }

  return null;
}
