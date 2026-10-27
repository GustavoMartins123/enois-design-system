// @vitest-environment jsdom
import { act } from "react";

import { createRoot } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";

import { E2eSetupBanner } from "./e2e-setup-banner.js";

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

const container = document.createElement("div");
document.body.append(container);
const root = createRoot(container);

afterEach(() => act(() => root.render(null)));

const setValue = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")!.set!;

function type(input: HTMLInputElement, value: string) {
  act(() => {
    setValue.call(input, value);
    input.dispatchEvent(new Event("input", { bubbles: true }));
  });
}

async function submit() {
  await act(async () => {
    container.querySelector("form")!.dispatchEvent(new Event("submit", { bubbles: true }));
  });
}

function openDefine(onDefinePassword: (password: string) => Promise<boolean>) {
  act(() =>
    root.render(
      <E2eSetupBanner
        hasPassword={false}
        onSetupWithPassword={async () => true}
        onDefinePassword={onDefinePassword}
      />,
    ),
  );
  act(() => container.querySelector("button")!.click());
  return [...container.querySelectorAll("input")];
}

describe("E2eSetupBanner", () => {
  it("validates the new password before calling the app", async () => {
    const onDefinePassword = vi.fn(async () => true);
    const [password, confirm] = openDefine(onDefinePassword);

    type(password!, "short");
    await submit();
    expect(container.textContent).toContain("Mínimo de 8 caracteres.");

    type(password!, "longenough");
    type(confirm!, "different1");
    await submit();
    expect(container.textContent).toContain("As senhas não coincidem.");
    expect(onDefinePassword).not.toHaveBeenCalled();
  });

  it("returns to the form with the error when the app reports a failure", async () => {
    const onDefinePassword = vi.fn(async () => false);
    const [password, confirm] = openDefine(onDefinePassword);

    type(password!, "longenough");
    type(confirm!, "longenough");
    await submit();

    expect(onDefinePassword).toHaveBeenCalledWith("longenough");
    expect(container.textContent).toContain("Não foi possível definir a senha. Tente de novo.");
    expect(container.querySelectorAll("input")).toHaveLength(2);
  });
});
