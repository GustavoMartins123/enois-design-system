// @vitest-environment jsdom
import { act } from "react";

import { type Root, createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { PostActionsProps } from "../../../types/domain/post/post-actions-props.js";

import { PostActions } from "./post-actions.js";

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

const emojis = { LOVE: "❤️" };
const REASON = "Páginas ainda não podem ser republicadas: a cópia perderia o conteúdo da página.";

function props(overrides: Partial<PostActionsProps<"LOVE">> = {}): PostActionsProps<"LOVE"> {
  return {
    emojis,
    reactionStatus: null,
    onReact: () => {},
    reactionPending: false,
    motionAllowed: () => false,
    reactionCount: 0,
    commentsCount: 0,
    savesCount: 0,
    saved: false,
    canRepost: true,
    onShowReactions: () => {},
    onComments: () => {},
    onRepost: () => {},
    onShare: () => {},
    onReport: () => {},
    onSave: () => {},
    ...overrides,
  };
}

describe("PostActions — republicar", () => {
  let root: Root;
  let host: HTMLDivElement;

  beforeEach(() => {
    host = document.createElement("div");
    document.body.appendChild(host);
    root = createRoot(host);
  });

  afterEach(() => {
    act(() => root.unmount());
    host.remove();
  });

  const render = (overrides: Partial<PostActionsProps<"LOVE">>) =>
    act(() => root.render(<PostActions {...props(overrides)} />));
  const button = (label: string) =>
    host.querySelector<HTMLButtonElement>(`[aria-label="${label}"]`);

  it("shows the repost button when the post can be reposted", () => {
    const onRepost = vi.fn();
    render({ onRepost });

    act(() => button("Republicar")!.click());

    expect(onRepost).toHaveBeenCalledOnce();
    expect(button("Republicar indisponível")).toBeNull();
  });

  it("keeps hiding the button when there is no reason, as before", () => {
    render({ canRepost: false });

    expect(button("Republicar")).toBeNull();
    expect(button("Republicar indisponível")).toBeNull();
  });

  it("shows a disabled button that explains why, without reposting", () => {
    const onRepost = vi.fn();
    render({ canRepost: false, repostUnavailableReason: REASON, onRepost });

    const disabled = button("Republicar indisponível")!;
    expect(disabled.getAttribute("aria-disabled")).toBe("true");
    // Continua focável: `disabled` nativo tiraria o botão do teclado e do toque.
    expect(disabled.disabled).toBe(false);
    expect(disabled.title).toBe(REASON);

    act(() => disabled.click());

    expect(onRepost).not.toHaveBeenCalled();
    expect(document.body.textContent).toContain(REASON);
  });
});
