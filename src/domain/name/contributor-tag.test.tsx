// @vitest-environment node
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { ContributorTag } from "./contributor-tag.js";

describe("ContributorTag", () => {
  it("uses the theme primary color when the profile has no tag color", () => {
    const html = renderToStaticMarkup(<ContributorTag />);

    expect(html).toContain("Contribuinte");
    expect(html).toContain("color:var(--primary)");
  });

  it("paints text and border with the chosen color", () => {
    const html = renderToStaticMarkup(<ContributorTag color="#ff7a18" />);

    expect(html).toContain("color:#ff7a18");
    expect(html).toContain("border-color:#ff7a18");
  });
});
