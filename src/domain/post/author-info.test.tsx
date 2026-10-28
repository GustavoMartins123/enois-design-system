// @vitest-environment node
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { AuthorInfo } from "./author-info.js";

describe("AuthorInfo", () => {
  it("can shrink inside the post header so a long name on a plate truncates in the card", () => {
    const html = renderToStaticMarkup(
      <AuthorInfo
        authorName="Cecília Maria Albuquerque de Vasconcelos"
        authorStyle={{ nameplate: "placa-teia" }}
        authorAvatar={null}
        authorHref="/perfil/cecilia"
        timeLabel="há 2 min"
      />,
    );

    expect(html.startsWith('<div class="flex min-w-0')).toBe(true);
    expect(html).toContain('data-nameplate="placa-teia"');
  });
});
