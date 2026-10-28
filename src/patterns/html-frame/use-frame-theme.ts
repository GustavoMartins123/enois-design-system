import { type RefObject, useEffect } from "react";

import type { ThemeName } from "../../types/patterns/theme-name.js";

import { syncFrameTheme } from "./sync-frame-theme.js";

/**
 * O `useThemeSync` do root grava a classe e o CSS do tema num efeito do pai, que roda depois
 * deste. O observador pega essa gravação e copia o resultado já calculado para o quadro.
 */
export function useFrameTheme(
  frame: RefObject<HTMLIFrameElement | null>,
  theme: ThemeName,
  themeStyleElementId: string | undefined,
  enabled = true,
): ThemeName {
  useEffect(() => {
    if (!enabled) return;
    const element = frame.current;
    if (!element) return;

    const apply = () => syncFrameTheme(element, theme);
    element.addEventListener("load", apply);
    apply();
    const stop = watchParentTheme(apply, themeStyleElementId);

    return () => {
      element.removeEventListener("load", apply);
      stop();
    };
  }, [enabled, frame, theme, themeStyleElementId]);

  return theme;
}

function watchParentTheme(apply: () => void, themeStyleElementId: string | undefined): () => void {
  const observer = new MutationObserver(apply);
  let themeStyle: Node | null = null;

  const attachThemeStyle = (): boolean => {
    const node = themeStyleElementId ? document.getElementById(themeStyleElementId) : null;
    if (!node || node === themeStyle) return false;
    themeStyle = node;
    observer.observe(node, { childList: true, characterData: true, subtree: true });
    return true;
  };

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class", "style", "data-theme"],
  });
  attachThemeStyle();

  const headObserver = new MutationObserver(() => {
    if (attachThemeStyle()) apply();
  });
  headObserver.observe(document.head, { childList: true });

  return () => {
    observer.disconnect();
    headObserver.disconnect();
  };
}
