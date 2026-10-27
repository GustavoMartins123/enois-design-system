// @vitest-environment node
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { LinkedinContactsSection } from "./linkedin-contacts-section.js";

const handlers = { onRetry: () => {}, onAutoInviteChange: () => {}, onImport: () => {} };

const summary = {
  autoInvite: false,
  contacts: 3,
  invited: 1,
  pending: 0,
  alreadyConnected: 1,
  noMatch: 1,
  ambiguous: 0,
  skipped: 0,
  queued: 0,
};

describe("LinkedinContactsSection", () => {
  it("summarizes the import and lists only the non-zero details", () => {
    const html = renderToStaticMarkup(<LinkedinContactsSection summary={summary} {...handlers} />);

    expect(html).toContain("3 contatos importados · 1 convite enviado");
    expect(html).toContain("Também: 1 já era conexão · 1 sem conta no Énóis.");
    expect(html).not.toContain("na fila");
  });

  it("shows the retry notice and no summary when the load failed", () => {
    const html = renderToStaticMarkup(
      <LinkedinContactsSection summary={null} loadError {...handlers} />,
    );

    expect(html).toContain("Não foi possível carregar os seus contatos do LinkedIn.");
    expect(html).toContain("Tentar de novo");
    expect(html).not.toContain("importados");
  });
});
