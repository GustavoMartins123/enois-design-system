import type { ReactNode } from "react";

import type { GameBannerFrameProps } from "./game-banner-frame-props.js";

export type GameBannerProps = {
  banner?: string | null;
  bannerHtml?: string | null;
  title: string;
  /** Desenha o HTML do banner no quadro isolado do app (`SandboxedHtmlFrame` com o tema). */
  renderHtmlFrame: (props: GameBannerFrameProps) => ReactNode;
};
