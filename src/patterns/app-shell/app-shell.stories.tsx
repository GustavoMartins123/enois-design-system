import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react-vite";
import { Home, Users } from "lucide-react";

import { AppHeaderLayout } from "./app-header-layout.js";
import { AppLayout } from "./app-layout.js";
import { AppSidebar } from "./app-sidebar.js";
import { NavigationDrawer } from "./navigation-drawer.js";
import { ThemeToggle } from "./theme-toggle.js";

const meta: Meta = {
  title: "Patterns/App shell",
};

export default meta;

const links = (
  <nav className="flex flex-col gap-1 p-3 text-sm">
    <a href="#" className="flex items-center gap-3 px-3 py-2">
      <Home className="h-4 w-4" />
      Início
    </a>

    <a href="#" className="flex items-center gap-3 px-3 py-2">
      <Users className="h-4 w-4" />
      Rede
    </a>
  </nav>
);

export const Layout: StoryObj = {
  render: function LayoutStory() {
    const [collapsed, setCollapsed] = useState(false);
    const [theme, setTheme] = useState<"light" | "dark">("light");

    return (
      <AppLayout>
        <AppLayout.Header>
          <AppHeaderLayout>
            <strong>Énóis</strong>

            <div className="ml-auto">
              <ThemeToggle
                theme={theme}
                onToggle={() => setTheme(theme === "light" ? "dark" : "light")}
              />
            </div>
          </AppHeaderLayout>
        </AppLayout.Header>

        <AppLayout.Content>
          <AppLayout.Sidebar>
            <AppSidebar collapsed={collapsed} onToggle={() => setCollapsed((value) => !value)}>
              {links}
            </AppSidebar>
          </AppLayout.Sidebar>

          <AppLayout.Main>
            <div className="surface-card p-6">Conteúdo da página</div>
          </AppLayout.Main>
        </AppLayout.Content>
      </AppLayout>
    );
  },
};

export const Drawer: StoryObj = {
  render: function DrawerStory() {
    const [open, setOpen] = useState(true);

    return (
      <>
        <button type="button" onClick={() => setOpen(true)}>
          Abrir menu
        </button>

        <NavigationDrawer open={open} onClose={() => setOpen(false)} brand={<strong>Énóis</strong>}>
          {links}
        </NavigationDrawer>
      </>
    );
  },
};
