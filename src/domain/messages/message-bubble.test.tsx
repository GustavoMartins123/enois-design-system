// @vitest-environment node
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { MessageBubble } from "./message-bubble.js";

function render(isMe: boolean, onReport?: () => void) {
  return renderToStaticMarkup(
    <MessageBubble
      message={{}}
      isMe={isMe}
      profileHref="/perfil/ana"
      timeLabel="10:00"
      emojis={{}}
      onReport={onReport}
    />,
  );
}

describe("MessageBubble report action", () => {
  it("offers the report on the other person's message", () => {
    expect(render(false, () => {})).toContain('aria-label="Denunciar mensagem"');
  });

  it("never offers it on your own message or without a handler", () => {
    expect(render(true, () => {})).not.toContain("Denunciar mensagem");
    expect(render(false)).not.toContain("Denunciar mensagem");
  });
});
