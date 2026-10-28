import type { SandboxedHtmlFrameProps } from "../../patterns/sandboxed-html-frame-props.js";

/** O quadro isolado do banner em HTML, sem o tema: quem desenha é o app (tema e modo lite). */
export type GameBannerFrameProps = Omit<
  SandboxedHtmlFrameProps,
  "theme" | "themeStyleElementId" | "lite"
>;
