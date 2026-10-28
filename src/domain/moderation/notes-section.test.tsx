// @vitest-environment node
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import type { AdminPostNoteData } from "../../types/domain/moderation/admin-post-note-data.js";

import { NotesSection } from "./notes-section.js";

const note: AdminPostNoteData = {
  id: "cm0note0000abc123",
  postHref: "/post/p1",
  body: "O dado citado é de 2019.",
  createdAtLabel: "18/10/2026, 10:31",
  authorId: "u1",
  authorUsername: null,
  authorName: "Bia",
};

function render(notes: AdminPostNoteData[]) {
  return renderToStaticMarkup(
    <NotesSection loading={false} notes={notes} reviewing={null} onReview={async () => true} />,
  );
}

describe("NotesSection", () => {
  it("shows the short id, the post link and the author name", () => {
    const html = render([note]);
    expect(html).toContain("#abc123");
    expect(html).toContain('href="/post/p1"');
    expect(html).toContain("Bia");
  });

  it("prefers the username and shows the empty state", () => {
    expect(render([{ ...note, authorUsername: "bia" }])).toContain("@bia");
    expect(render([])).toContain("Nenhuma nota pendente.");
  });
});
