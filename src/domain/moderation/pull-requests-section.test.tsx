// @vitest-environment node
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { PullRequestsSection } from "./pull-requests-section.js";

const pull = {
  repository: "rede-enois/frontend",
  number: 12,
  title: "Corrige o login",
  url: "javascript:alert(1)",
  authorLogin: "bia",
  authorAvatarUrl: null,
  updatedAtLabel: null,
};

function render(showWriteHint: boolean) {
  return renderToStaticMarkup(
    <PullRequestsSection
      loading={false}
      pulls={[pull]}
      showWriteHint={showWriteHint}
      onConnectWrite={() => {}}
      reviewing={null}
      onReview={async () => true}
    />,
  );
}

describe("PullRequestsSection", () => {
  it("offers the write link only when asked", () => {
    expect(render(true)).toContain("Conectar GitHub com permissão de escrita");
    expect(render(false)).not.toContain("Conectar GitHub");
  });

  it("never renders an unsafe PR url", () => {
    const html = render(false);
    expect(html).not.toContain("javascript:");
    expect(html).toContain("por @bia");
  });
});
