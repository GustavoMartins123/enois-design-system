// @vitest-environment node
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { SHOP_COLLECTIONS, SHOP_ITEMS } from "./cosmetic-shop.fixture.js";
import { CosmeticShop } from "./cosmetic-shop.js";

const noop = () => {};
const handlers = { onRetry: noop, onBuy: noop, onBuyLook: noop, onEquip: noop, onUnequip: noop };
const user = { name: "Ana Souza", username: "ana" };

describe("CosmeticShop", () => {
  it("opens on the collection in season, one page of cards and every look", () => {
    const html = renderToStaticMarkup(
      <CosmeticShop items={SHOP_ITEMS} collections={SHOP_COLLECTIONS} user={user} {...handlers} />,
    );

    expect(html.match(/class="cos-item /g)?.length).toBeLessThanOrEqual(24);
    expect(html).toContain("Provar Redemoinho no perfil");
    expect(html.match(/class="cos-look /g)).toHaveLength(SHOP_COLLECTIONS.length);
    expect(html).toContain("Prêmio de evento");
    expect(html).toContain("Clássicos");
  });

  it("marks out-of-season items and looks instead of selling them", () => {
    const html = renderToStaticMarkup(
      <CosmeticShop
        items={SHOP_ITEMS}
        collections={SHOP_COLLECTIONS}
        user={user}
        initialCollection="natal"
        {...handlers}
      />,
    );

    expect(html).toContain("Fora de temporada");
    expect(html).not.toContain(">Comprar<");
  });

  it("shows the error state with a retry action", () => {
    const html = renderToStaticMarkup(<CosmeticShop error user={user} {...handlers} />);

    expect(html).toContain('role="alert"');
    expect(html).toContain("Tentar novamente");
  });
});
