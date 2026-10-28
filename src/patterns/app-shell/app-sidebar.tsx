import { ChevronsLeft, ChevronsRight } from "lucide-react";

import { cn } from "../../lib/utils.js";
import { useMessages } from "../../messages/messages-context.js";
import type { AppSidebarProps } from "../../types/patterns/app-sidebar-props.js";

export function AppSidebar({ collapsed, onToggle, children }: AppSidebarProps) {
  const messages = useMessages().appSidebar;

  return (
    <aside
      className={cn(
        // A altura para no que cabe abaixo do cabeçalho (top-20 = 5rem) e a barra rola por dentro.
        // Antes era `h-fit` + sticky: com mais itens do que cabia na tela, o fim da lista ficava
        // fora do alcance — sem rolagem nenhuma, porque um elemento do tamanho do conteúdo nunca
        // rola. `overscroll-contain` evita que a rolagem da barra puxe a página junto.
        "sticky top-20 hidden max-h-[calc(100vh-6rem)] shrink-0 overflow-y-auto overscroll-contain scrollbar-on-hover lg:block",
        collapsed ? "w-16" : "w-60",
      )}
      style={{ transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)" }}
    >
      <div className="flex flex-col gap-1">
        <button
          onClick={onToggle}
          className="mb-1 grid h-8 w-8 place-items-center self-end rounded-lg text-text-subtle transition hover:bg-surface-2 hover:text-primary"
          aria-label={collapsed ? messages.expandMenu : messages.collapseMenu}
          title={collapsed ? messages.expandMenu : messages.collapseMenu}
        >
          {collapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
        </button>

        {children}
      </div>
    </aside>
  );
}
