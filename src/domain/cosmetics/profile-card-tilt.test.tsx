// @vitest-environment jsdom
import { act } from "react";

import { type Root, createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ProfileCard } from "./profile-card.js";

describe("ProfileCard tilt", () => {
  let root: Root;
  let host: HTMLDivElement;

  beforeEach(async () => {
    vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
    vi.stubGlobal(
      "matchMedia",
      vi.fn((query: string) => ({ matches: query.includes("hover") })),
    );
    host = document.createElement("div");
    document.body.append(host);
    root = createRoot(host);
    await act(async () => root.render(<ProfileCard profile={{ name: "Ana" }} />));
  });

  afterEach(async () => {
    await act(async () => root.unmount());
    host.remove();
    document.documentElement.removeAttribute("data-no-tilt");
    vi.unstubAllGlobals();
  });

  const hover = () => {
    const card = host.querySelector<HTMLElement>(".cos-card")!;
    card.dispatchEvent(new MouseEvent("pointermove", { clientX: 10, clientY: 10 }));
    return card;
  };

  it("tilts under the pointer by default", () => {
    expect(hover().style.getPropertyValue("--sheen")).toBe("1");
  });

  it("stays still once the person turns the 3D effect off", () => {
    document.documentElement.setAttribute("data-no-tilt", "");

    const card = hover();

    expect(card.style.getPropertyValue("--sheen")).toBe("");
    expect(card.style.getPropertyValue("--rx")).toBe("");
  });
});
