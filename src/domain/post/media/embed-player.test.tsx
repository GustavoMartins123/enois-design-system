// @vitest-environment jsdom
import { act } from "react";

import { type Root, createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { EmbedPlayer } from "./embed-player.js";

describe("EmbedPlayer", () => {
  let root: Root | null = null;
  let container: HTMLDivElement;

  beforeEach(() => {
    (globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root?.unmount());
    root = null;
    document.body.replaceChildren();
  });

  it("mounts the provider frame with the referrer policy the provider requires", async () => {
    await act(async () => root?.render(<EmbedPlayer type="youtube" id="dQw4w9WgXcQ" />));

    // Before the click only the cover exists: no third-party player loads with the feed.
    expect(container.querySelector("iframe")).toBeNull();

    const cover = container.querySelector("button");
    expect(cover).not.toBeNull();

    await act(async () => cover?.click());

    const frame = container.querySelector("iframe");
    expect(frame?.getAttribute("referrerpolicy")).toBe("strict-origin-when-cross-origin");
    expect(frame?.getAttribute("src")).toContain("youtube.com/embed/dQw4w9WgXcQ");
  });
});
