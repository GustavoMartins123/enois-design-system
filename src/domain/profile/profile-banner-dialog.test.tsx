// @vitest-environment jsdom
import { act } from "react";

import { createRoot } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ProfileBannerDialog } from "./profile-banner-dialog.js";

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

const container = document.createElement("div");
document.body.append(container);
const root = createRoot(container);

afterEach(() => act(() => root.render(null)));

const render = (props: { shopBanner?: string | null; onUseOwnCover?: () => void }) =>
  act(() =>
    root.render(
      <ProfileBannerDialog
        open
        onOpenChange={() => undefined}
        initialHtml={null}
        onPickPhoto={() => undefined}
        maxLength={20000}
        onSave={() => undefined}
        renderHtmlFrame={() => null}
        {...props}
      />,
    ),
  );

const ownCoverButton = () =>
  [...document.body.querySelectorAll("button")].find(
    (button) => button.textContent === "Voltar para a minha capa",
  );

describe("ProfileBannerDialog", () => {
  it("names the shop banner over the cover and takes it off", () => {
    const onUseOwnCover = vi.fn();
    render({ shopBanner: "Cemitério", onUseOwnCover });

    expect(document.body.textContent).toContain("banner Cemitério, da loja");
    act(() => ownCoverButton()!.click());
    expect(onUseOwnCover).toHaveBeenCalledOnce();
  });

  it("says nothing about the shop without an equipped banner", () => {
    render({ shopBanner: null, onUseOwnCover: () => undefined });

    expect(ownCoverButton()).toBeUndefined();
  });
});
