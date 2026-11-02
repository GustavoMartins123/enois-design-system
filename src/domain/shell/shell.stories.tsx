import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bell, Briefcase, Compass, Home, Search, Users } from "lucide-react";

import { ThemeToggle } from "../../patterns/app-shell/theme-toggle.js";
import type { AccountMenuHrefs } from "../../types/domain/account/account-menu-hrefs.js";
import type { InterfaceContext } from "../../types/domain/shell/interface-context.js";
import { AccountMenu } from "../account/account-menu.js";

import { AuthenticatedAppHeader } from "./authenticated-app-header.js";
import { ContextSwitcher } from "./context-switcher.js";
import { GuestAppHeader } from "./guest-app-header.js";
import { NavigationLinks } from "./navigation-links.js";
import { PlatformSpacesCard } from "./platform-spaces-card.js";

const meta: Meta = {
  title: "Domain/Shell",
};

export default meta;

const themeToggle = <ThemeToggle theme="light" onToggle={() => {}} />;

export const AuthenticatedHeader: StoryObj = {
  render: () => (
    <AuthenticatedAppHeader
      homeHref="#"
      onOpenNavigation={() => {}}
      search={<input className="ml-2 h-10 flex-1 rounded-full border px-4" placeholder="Buscar" />}
      actions={themeToggle}
    />
  ),
};

const menuHrefs: AccountMenuHrefs = {
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

/** O cabeçalho como o app o monta no telefone: busca recolhida e o menu da conta nas ações. */
export const AuthenticatedHeaderPhone: StoryObj = {
  parameters: { layout: "fullscreen" },
  render: function PhoneHeaderStory() {
    const [menu, setMenu] = useState(false);

    return (
      <AuthenticatedAppHeader
        homeHref="#"
        onOpenNavigation={() => {}}
        search={
          <button
            className="ml-auto grid h-9 w-9 place-items-center rounded-full text-text-subtle md:hidden"
            aria-label="Buscar"
          >
            <Search className="h-4 w-4" />
          </button>
        }
        actions={
          <>
            {themeToggle}

            <button
              className="relative grid h-10 w-10 place-items-center rounded-full text-text-subtle"
              aria-label="Notificações"
            >
              <Bell className="h-5 w-5" />
            </button>

            <AccountMenu
              profile={{ name: "Ana Souza", email: "ana@example.com", avatar: null }}
              hrefs={menuHrefs}
              open={menu}
              onOpenChange={setMenu}
              onChangeEmail={() => {}}
              onChangePassword={() => {}}
              onOpenLinkedAccounts={() => {}}
              onOpenHealthyUsage={() => {}}
              onDeleteAccount={() => {}}
              onLogout={() => {}}
              loggingOut={false}
            />
          </>
        }
      />
    );
  },
};

export const GuestHeader: StoryObj = {
  render: () => <GuestAppHeader homeHref="#" loginHref="#" themeToggle={themeToggle} />,
};

export const Navigation: StoryObj = {
  render: () => (
    <div className="w-60">
      <NavigationLinks
        items={[
          { href: "#feed", label: "Início", icon: Home, active: true },
          { href: "#rede", label: "Rede", icon: Users, active: false },
          { href: "#comunidades", label: "Comunidades", icon: Compass, active: false },
        ]}
        myCommunities={[{ id: "c1", name: "Mulheres na Tecnologia", href: "#" }]}
        favoriteCommunities={[{ id: "c2", name: "Design aberto", href: "#" }]}
      />
    </div>
  ),
};

export const NavigationWithContexts: StoryObj = {
  render: function NavigationWithContextsStory() {
    const [context, setContext] = useState<InterfaceContext>("PROFESSIONAL");
    const items =
      context === "SOCIAL"
        ? [
            { href: "#feed", label: "Início", icon: Home, active: true },
            { href: "#comunidades", label: "Comunidades", icon: Compass, active: false },
          ]
        : [
            { href: "#feed", label: "Início", icon: Home, active: true },
            { href: "#vagas", label: "Vagas", icon: Briefcase, active: false },
          ];
    return (
      <div className="w-60">
        <NavigationLinks
          header={
            <ContextSwitcher
              value={context}
              onChange={setContext}
              professionalSetupHref="#profissional"
            />
          }
          items={items}
          myCommunities={[]}
          favoriteCommunities={[]}
        />
      </div>
    );
  },
};

export const CollapsedContextSwitcher: StoryObj = {
  render: () => <ContextSwitcher value="SOCIAL" onChange={() => {}} collapsed />,
};

export const PlatformSpaces: StoryObj = {
  render: () => (
    <div className="max-w-xs">
      <PlatformSpacesCard
        spaces={[
          { href: "#", label: "Loja" },
          { href: "#", label: "Vagas" },
          { href: "#", label: "Projetos da comunidade" },
        ]}
      />
    </div>
  ),
};
