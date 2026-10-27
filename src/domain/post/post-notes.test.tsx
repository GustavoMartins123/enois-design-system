// @vitest-environment node
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { PostNotes } from "./post-notes.js";

const onSend = async (): Promise<boolean> => true;

const note = {
  id: "n1",
  body: "Contexto que faltava.",
  authorName: "Ana",
  createdAtLabel: "12/03/2024 14:30",
  authorHref: null,
};

describe("PostNotes", () => {
  it("renders nothing when there is nothing to show", () => {
    expect(renderToStaticMarkup(<PostNotes notes={[]} onSend={onSend} />)).toBe("");
  });

  it("shows approved notes without a profile link when the author has no href", () => {
    const html = renderToStaticMarkup(<PostNotes notes={[note]} onSend={onSend} />);

    expect(html).toContain("Contexto que faltava.");
    expect(html).toContain("· 12/03/2024 14:30");
    expect(html).not.toContain("href=");
    expect(html).not.toContain("Adicionar nota de rodapé");
  });

  it("shows the pending, denied and add states", () => {
    const html = renderToStaticMarkup(
      <PostNotes notes={[]} pending deniedReason="Sem fonte." canAdd onSend={onSend} />,
    );

    expect(html).toContain("Sua nota está em análise pela moderação.");
    expect(html).toContain("Sua nota foi negada: Sem fonte.");
    expect(html).toContain("Adicionar nota de rodapé");
  });

  it("shows the discarded note on its own", () => {
    const html = renderToStaticMarkup(<PostNotes notes={[]} discarded onSend={onSend} />);

    expect(html).toContain("a sua foi descartada sem penalidade");
  });
});
