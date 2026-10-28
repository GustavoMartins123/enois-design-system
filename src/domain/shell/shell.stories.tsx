import type { Meta, StoryObj } from "@storybook/react-vite";
import { Compass, Home, Users } from "lucide-react";

import { ThemeToggle } from "../../patterns/app-shell/theme-toggle.js";

import { AuthenticatedAppHeader } from "./authenticated-app-header.js";
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
