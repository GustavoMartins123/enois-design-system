// @vitest-environment jsdom
import { act } from "react";

import { createRoot } from "react-dom/client";
import { afterEach, describe, expect, it } from "vitest";

import type { AccountMenuHrefs } from "../../types/domain/account/account-menu-hrefs.js";

import { AccountMenu } from "./account-menu.js";

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

const container = document.createElement("div");
document.body.append(container);
const root = createRoot(container);

afterEach(() => act(() => root.render(null)));

const hrefs: AccountMenuHrefs = {
  profile: "#",
  corporateProfile: "#",
  wallet: "#",
  marketplace: "#",
  support: "#",
  security: "#",
  blockedUsers: "#",
  myReports: "#",
  sanctions: "#",
  guardian: "#",
  moderator: "#",
  apoie: "#",
};

function render(menuHrefs: AccountMenuHrefs, withAccountCallbacks = true) {
  const noop = () => {};
  act(() =>
    root.render(
      <AccountMenu
        profile={{ name: "Pessoa Teste", email: "pessoa@example.com", avatar: null }}
        hrefs={menuHrefs}
        open
        onOpenChange={noop}
        onChangeEmail={withAccountCallbacks ? noop : undefined}
        onChangePassword={withAccountCallbacks ? noop : undefined}
        onOpenLinkedAccounts={withAccountCallbacks ? noop : undefined}
        onOpenHealthyUsage={noop}
        onDeleteAccount={withAccountCallbacks ? noop : undefined}
        onLogout={noop}
        loggingOut={false}
      />,
    ),
  );
}

const preferencesItem = () =>
  [...document.body.querySelectorAll("a")].find(
    (a) => a.textContent === "Preferências de notificação",
  );

describe("AccountMenu: trigger on a phone", () => {
  it("não gasta respiro à direita quando o rótulo some, para caber no cabeçalho a 320px", () => {
    render(hrefs);

    const trigger = document.body.querySelector<HTMLButtonElement>(
      'button[aria-haspopup="dialog"]',
    )!;

    expect(trigger.className).toContain("pr-0");
    expect(trigger.className).toContain("sm:pr-3");
  });
});

describe("AccountMenu: notification preferences item", () => {
  it("shows the item when hrefs.notificationPreferences is set", () => {
    render({ ...hrefs, notificationPreferences: "/configuracoes/notificacoes" });

    expect(preferencesItem()?.getAttribute("href")).toBe("/configuracoes/notificacoes");
  });

  it("hides the item without the href", () => {
    render(hrefs);

    expect(document.body.textContent).toContain("Ver perfil");
    expect(preferencesItem()).toBeUndefined();
  });
});

describe("AccountMenu: account items on their own page (#562)", () => {
  const ACCOUNT_ITEMS = [
    "Alterar e-mail",
    "Segurança e verificação",
    "Usuários bloqueados",
    "Minhas denúncias",
    "Penalidades",
    "Trocar senha",
    "Contas vinculadas",
    "Excluir conta",
  ];

  it("shows one entry for the page and none of the account items", () => {
    const { profile, corporateProfile, wallet, marketplace, support, guardian, moderator, apoie } =
      hrefs;
    render(
      {
        profile,
        corporateProfile,
        wallet,
        marketplace,
        support,
        guardian,
        moderator,
        apoie,
        account: "/conta",
      },
      false,
    );

    const entry = [...document.body.querySelectorAll("a")].find(
      (a) => a.textContent === "Conta e segurança",
    );
    expect(entry?.getAttribute("href")).toBe("/conta");
    for (const label of ACCOUNT_ITEMS) expect(document.body.textContent).not.toContain(label);
  });

  it("keeps every item when the app still passes them", () => {
    render(hrefs);

    for (const label of ACCOUNT_ITEMS) expect(document.body.textContent).toContain(label);
    expect(document.body.textContent).not.toContain("Conta e segurança");
  });
});
