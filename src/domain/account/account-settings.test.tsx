// @vitest-environment jsdom
import { act } from "react";

import { createRoot } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";

import { AccountSettings } from "./account-settings.js";

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

const container = document.createElement("div");
document.body.append(container);
const root = createRoot(container);

afterEach(() => act(() => root.render(null)));

describe("AccountSettings", () => {
  it("links the pages and opens the dialogs through callbacks", () => {
    const onChangeEmail = vi.fn();
    const onDeleteAccount = vi.fn();
    act(() =>
      root.render(
        <AccountSettings
          hrefs={{
            security: "/seguranca",
            blockedUsers: "/bloqueados",
            myReports: "/denuncias",
            sanctions: "/penalidades",
          }}
          onChangeEmail={onChangeEmail}
          onChangePassword={() => {}}
          onOpenLinkedAccounts={() => {}}
          onDeleteAccount={onDeleteAccount}
        />,
      ),
    );

    const hrefs = [...container.querySelectorAll("a")].map((a) => a.getAttribute("href"));
    expect(hrefs).toEqual(["/seguranca", "/bloqueados", "/denuncias", "/penalidades"]);
    expect(container.querySelector("h1")?.textContent).toBe("Conta e segurança");

    const button = (label: string) =>
      [...container.querySelectorAll("button")].find((b) => b.textContent === label);
    act(() => button("Alterar e-mail")?.click());
    act(() => button("Excluir conta")?.click());
    expect(onChangeEmail).toHaveBeenCalledOnce();
    expect(onDeleteAccount).toHaveBeenCalledOnce();
  });
});
