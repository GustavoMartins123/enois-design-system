// @vitest-environment jsdom
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it } from "vitest";

import { AvatarFrameFx } from "./avatar-frame-fx.js";

const FRAME = "moldura-neon";

function renderBatata(): string {
  document.documentElement.setAttribute("data-batata", "");
  try {
    return renderToString(<AvatarFrameFx frame={FRAME} />);
  } finally {
    document.documentElement.removeAttribute("data-batata");
  }
}

describe("moldura com efeito no BATATA", () => {
  afterEach(() => document.documentElement.removeAttribute("data-batata"));

  it("fora do BATATA desenha as partículas da moldura", () => {
    expect(renderToString(<AvatarFrameFx frame={FRAME} />)).toContain("moldura-fx");
  });

  // As partículas são até 60 nós por moldura e ficariam invisíveis (o CSS do BATATA as esconde).
  it("no BATATA não monta o efeito", () => {
    expect(renderBatata()).toBe("");
  });
});
