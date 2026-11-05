// @vitest-environment jsdom
import { act } from "react";

import { type Root, createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { defaultMessages } from "../../../messages/default-messages.js";

import { MediaStage } from "./media-stage.js";

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

/**
 * O palco abre com som. Onde o navegador recusa autoplay com áudio (iOS/PWA), ele tenta de novo
 * mudo — que é permitido — e a pessoa tem o botão de som para quando quiser ouvir.
 */
describe("MediaStage", () => {
  let root: Root | null = null;
  let container: HTMLDivElement;

  beforeEach(() => {
    vi.spyOn(HTMLMediaElement.prototype, "load").mockImplementation(() => undefined);
    vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => undefined);
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root?.unmount());
    root = null;
    document.body.replaceChildren();
    document.body.style.overflow = "";
    vi.restoreAllMocks();
  });

  it("cai para o autoplay mudo quando o navegador recusa som", async () => {
    const play = vi
      .spyOn(HTMLMediaElement.prototype, "play")
      .mockRejectedValueOnce(
        Object.assign(new Error("play() failed because the user didn't interact"), {
          name: "NotAllowedError",
        }),
      )
      .mockResolvedValue(undefined);

    await act(async () =>
      root!.render(<MediaStage src="https://cdn.exemplo/video.mp4" onClose={() => undefined} />),
    );

    const video = document.querySelector("video")!;
    expect(play).toHaveBeenCalledTimes(2);
    expect(video.muted).toBe(true);

    // O controle de som passa a oferecer "ligar o som" — a pessoa escolhe quando ouvir.
    const mute = document.querySelector<HTMLButtonElement>(
      `button[aria-label="${defaultMessages.mediaStage.unmute}"]`,
    );
    expect(mute).not.toBeNull();
  });

  it("mantém o som quando o navegador aceita", async () => {
    const play = vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue(undefined);

    await act(async () =>
      root!.render(<MediaStage src="https://cdn.exemplo/video.mp4" onClose={() => undefined} />),
    );

    const video = document.querySelector("video")!;
    expect(play).toHaveBeenCalledOnce();
    expect(video.muted).toBe(false);
    expect(
      document.querySelector(`button[aria-label="${defaultMessages.mediaStage.mute}"]`),
    ).not.toBeNull();
  });
});
