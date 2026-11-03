// @vitest-environment jsdom
import { act } from "react";

import { createRoot } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";

import { PostComments } from "./post-comments.js";

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
// jsdom has no layout: scrolling is a no-op here.
Element.prototype.scrollIntoView = vi.fn();

const container = document.createElement("div");
document.body.append(container);
const root = createRoot(container);

afterEach(() => act(() => root.render(null)));

const field = vi.fn(({ toolsOpen }: { toolsOpen: boolean }) => (
  <textarea data-tools={toolsOpen ? "open" : "closed"} />
));

const comments = [
  { id: "c1", parentCommentId: null, authorName: "Ana Souza" },
  { id: "c2", parentCommentId: "c1", authorName: "Bruno Lima" },
];

const render = (
  onOpenGifPicker = vi.fn(),
  reply: { replyToId: string | null; onCancelReply?: () => void } = { replyToId: null },
) =>
  act(() =>
    root.render(
      <PostComments
        formId="comments"
        comments={comments}
        loading={false}
        loadingMore={false}
        hasMore={false}
        error={null}
        onRetry={() => undefined}
        onLoadMore={() => undefined}
        renderComment={(comment) => <p data-comment={comment.id}>{comment.authorName}</p>}
        replyToId={reply.replyToId}
        onCancelReply={reply.onCancelReply ?? (() => undefined)}
        media={[]}
        mediaSpoiler={false}
        onToggleMediaSpoiler={() => undefined}
        onRemoveMedia={() => undefined}
        onInsertMedia={() => undefined}
        onAddImages={() => undefined}
        onAddAudio={() => undefined}
        onErrorChange={() => undefined}
        composerField={field}
        canSend={false}
        sending={false}
        onSubmit={async () => true}
        onOpenGifPicker={onOpenGifPicker}
      />,
    ),
  );

const plus = () => container.querySelector<HTMLButtonElement>("button[aria-controls]")!;
const tray = () => document.getElementById(plus().getAttribute("aria-controls")!)!;
const textarea = () => container.querySelector("textarea")!;

describe("PostComments composer", () => {
  it("keeps the extras folded away until the plus opens them", () => {
    render();

    expect(plus().getAttribute("aria-expanded")).toBe("false");
    expect(tray().hasAttribute("inert")).toBe(true);
    expect(textarea().dataset.tools).toBe("closed");

    act(() => plus().click());
    expect(plus().getAttribute("aria-expanded")).toBe("true");
    expect(plus().getAttribute("aria-label")).toBe("Fechar anexos e formatação");
    expect(tray().hasAttribute("inert")).toBe(false);
    expect(textarea().dataset.tools).toBe("open");
  });

  it("gives the field the whole width on a phone: send drops to its own line", () => {
    render();

    const row = textarea().closest("div.flex")!;
    expect(row.className).toContain("flex-wrap");

    const send = container.querySelector<HTMLButtonElement>('button[type="submit"]')!;
    // Full width below `sm` (the field keeps the row), icon-sized from `sm` up.
    expect(send.className).toContain("w-full");
    expect(send.className).toContain("sm:w-9");
    expect(send.className).toContain("order-last");
  });

  it("folds the tray when a GIF is picked", () => {
    const onOpenGifPicker = vi.fn();
    render(onOpenGifPicker);
    act(() => plus().click());

    const gif = [...tray().querySelectorAll("button")].find((b) => b.textContent === "GIF")!;
    act(() => gif.click());
    expect(onOpenGifPicker).toHaveBeenCalledOnce();
    expect(plus().getAttribute("aria-expanded")).toBe("false");
  });

  it("opens a reply right under the comment it answers, focused, and Esc leaves it", () => {
    const onCancelReply = vi.fn();
    render(vi.fn(), { replyToId: "c2", onCancelReply });

    const forms = container.querySelectorAll("form");
    expect(forms).toHaveLength(1);
    const answered = container.querySelector('[data-comment="c2"]')!;
    expect(answered.nextElementSibling).toBe(forms[0]);
    expect(forms[0].textContent).toContain("respondendo a Bruno Lima");
    expect(document.activeElement).toBe(textarea());

    act(() => {
      textarea().dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    });
    expect(onCancelReply).toHaveBeenCalledOnce();
  });

  it("keeps a reply to a comment that is not loaded on top", () => {
    render(vi.fn(), { replyToId: "gone" });

    const form = container.querySelector("form")!;
    expect(form.compareDocumentPosition(container.querySelector('[data-comment="c1"]')!)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
  });
});
