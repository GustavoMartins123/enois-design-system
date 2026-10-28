// @vitest-environment node
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { PurchasedThemes } from "./purchased-themes.js";

describe("PurchasedThemes", () => {
  it("shows the empty message when nothing was bought", () => {
    const html = renderToStaticMarkup(<PurchasedThemes themes={[]} onApply={() => {}} />);

    expect(html).toContain("Temas adquiridos");
    expect(html).toContain("Você ainda não comprou temas na loja.");
    expect(html).not.toContain("<ul");
  });

  it("lists each theme, falling back to the apply label without a title", () => {
    const html = renderToStaticMarkup(
      <PurchasedThemes
        themes={[
          { itemId: "a", title: "Roxo profundo" },
          { itemId: "b", title: null },
        ]}
        onApply={() => {}}
      />,
    );

    expect(html).toContain("Roxo profundo");
    expect(html).toContain("Aplicar tema");
    expect(html).not.toContain('disabled=""');
    expect(html).not.toContain("animate-spin");
  });

  it("locks every button and spins only on the theme being applied", () => {
    const html = renderToStaticMarkup(
      <PurchasedThemes
        themes={[
          { itemId: "a", title: "A" },
          { itemId: "b", title: "B" },
        ]}
        applyingItemId="b"
        onApply={() => {}}
      />,
    );

    expect(html.match(/disabled=""/g)).toHaveLength(2);
    expect(html.match(/animate-spin/g)).toHaveLength(1);
  });
});
