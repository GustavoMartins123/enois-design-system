// @vitest-environment node
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { StyledName } from "./styled-name.js";

describe("StyledName", () => {
  it("renders only the name when the profile has no customization", () => {
    expect(renderToStaticMarkup(<StyledName name="Mel" />)).toBe("Mel");
    expect(renderToStaticMarkup(<StyledName name="Mel" style={null} />)).toBe("Mel");
  });

  it("applies the theme class, gradient and chosen color", () => {
    const html = renderToStaticMarkup(
      <StyledName
        name="Mel"
        style={{ theme: "NEON", font: "DISPLAY", color: "#ff4fa3" }}
        className="font-bold"
      />,
    );

    expect(html).toContain("profile-name-theme-neon");
    expect(html).toContain("font-bold");
    expect(html).toContain("background-clip:text");
    expect(html).toContain("#8b5cf6");
    expect(html).toContain("#ff4fa3");
  });

  it("uses the theme font when the stored font is missing", () => {
    const html = renderToStaticMarkup(<StyledName name="Mel" style={{ theme: "PIXEL" }} />);

    expect(html).toContain("Press Start 2P");
  });

  it("paints a single color when the theme has no gradient", () => {
    const html = renderToStaticMarkup(
      <StyledName name="Mel" style={{ theme: "DEFAULT", color: "#22c55e" }} />,
    );

    expect(html).toContain("color:#22c55e");
    expect(html).not.toContain("background-clip");
  });

  it("paints a seasonal theme with its gradient, web font and size", () => {
    const html = renderToStaticMarkup(
      <StyledName name="Mel" style={{ theme: "nome-assombrado" }} />,
    );

    expect(html).toContain("linear-gradient(180deg, #84cc16, #16a34a)");
    expect(html).toContain("Creepster");
    expect(html).toContain("font-size:1.04em");
    expect(html).toContain("background-clip:text");
  });

  it("sits on the inline plate when one is equipped, and skips an unknown plate", () => {
    const html = renderToStaticMarkup(
      <StyledName name="Mel" style={{ theme: "NEON", nameplate: "placa-mata" }} />,
    );

    expect(html).toContain('data-nameplate="placa-mata"');
    expect(html).toContain("cos-plate--inline");
    expect(html).toContain("profile-name-theme-neon");
    expect(
      renderToStaticMarkup(<StyledName name="Mel" style={{ nameplate: "placa-x" }} />),
    ).not.toContain("data-nameplate");
  });
});
