// @vitest-environment node
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import type { TicketThreadProps } from "../../types/domain/moderation/ticket-thread-props.js";

import { TicketThread } from "./ticket-thread.js";

function render(props: Partial<TicketThreadProps>) {
  return renderToStaticMarkup(
    <TicketThread
      messages={[]}
      mirrored={false}
      legacyReply={null}
      legacyRepliedAtLabel={null}
      {...props}
    />,
  );
}

describe("TicketThread", () => {
  it("renders nothing without messages or a legacy reply", () => {
    expect(render({})).toBe("");
  });

  it("falls back to the legacy single reply", () => {
    const html = render({ legacyReply: "Resolvido.", legacyRepliedAtLabel: "18/10/2026, 10:30" });
    expect(html).toContain("Resposta do suporte");
    expect(html).toContain("Resolvido.");
    expect(html).not.toContain("Conversa");
  });

  it("shows the conversation, preferring the GitHub login, and the mirror hint", () => {
    const html = render({
      mirrored: true,
      legacyReply: "Resolvido.",
      messages: [
        {
          id: "m1",
          direction: "GITHUB",
          authorGithubLogin: "bia",
          authorName: "Bia",
          body: "Reproduzi.",
          createdAtLabel: "18/10/2026, 11:00",
        },
      ],
    });
    expect(html).toContain("Conversa");
    expect(html).toContain("issue do GitHub");
    expect(html).toContain("@bia");
    expect(html).not.toContain("Resolvido.");
  });
});
