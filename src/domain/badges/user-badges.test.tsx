// @vitest-environment node
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { UserBadges } from "./user-badges.js";

describe("UserBadges", () => {
  it("draws official badge ids in SVG and keeps uploaded URLs as images, in order", () => {
    const html = renderToStaticMarkup(
      <UserBadges badges={["emblema-carapuca", "https://cdn.test/a.png", "emblema-morcego"]} />,
    );

    expect(html.match(/<svg/g)).toHaveLength(2);
    expect(html.match(/<img/g)).toHaveLength(1);
    expect(html).toContain('src="https://cdn.test/a.png"');
    expect(html.indexOf("<svg")).toBeLessThan(html.indexOf("<img"));
    expect(html.lastIndexOf("<svg")).toBeGreaterThan(html.indexOf("<img"));
  });

  it("skips unknown official ids and still caps the list at five", () => {
    const html = renderToStaticMarkup(
      <UserBadges
        badges={[
          "emblema-desconhecido",
          "emblema-pipa",
          "/b1.png",
          "/b2.png",
          "/b3.png",
          "/b4.png",
        ]}
      />,
    );

    expect(html.match(/<svg/g)).toHaveLength(1);
    expect(html.match(/<img/g)).toHaveLength(3);
  });

  it("falls back to the legacy single badge", () => {
    expect(renderToStaticMarkup(<UserBadges badge="emblema-cafe" />)).toContain("<svg");
  });
});
