import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { Input } from "./input.js";

describe("campo de entrada", () => {
  it("mantem o contador por padrao quando ha limite", () => {
    const html = renderToStaticMarkup(<Input maxLength={6} defaultValue="012345" />);

    expect(html).toContain("6 / 6");
    expect(html).toContain('aria-live="polite"');
    expect(html).toMatch(/maxlength="6"/i);
  });

  it("permite manter o contador explicitamente", () => {
    const html = renderToStaticMarkup(<Input maxLength={6} showCounter defaultValue="012" />);

    expect(html).toContain("3 / 6");
    expect(html).not.toContain("showCounter");
  });

  it("oculta o contador sem perder o limite ou o valor do campo", () => {
    const html = renderToStaticMarkup(
      <Input maxLength={6} showCounter={false} value="012345" readOnly />,
    );

    expect(html).toMatch(/maxlength="6"/i);
    expect(html).toContain('value="012345"');
    expect(html).not.toContain("6 / 6");
    expect(html).not.toContain("limite de caracteres atingido");
    expect(html).not.toContain("aria-live");
    expect(html).not.toContain("showCounter");
  });

  it("nao mostra contador sem limite mesmo com a opcao de contador habilitada", () => {
    const html = renderToStaticMarkup(<Input showCounter defaultValue="012345" />);

    expect(html).not.toContain("aria-live");
    expect(html).not.toContain("showCounter");
    expect(html).not.toMatch(/maxlength=/i);
  });
});
