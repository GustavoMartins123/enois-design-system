import { Menu } from "lucide-react";

import { useMessages } from "../../messages/messages-context.js";
import { AppHeaderLayout } from "../../patterns/app-shell/app-header-layout.js";
import type { AuthenticatedAppHeaderProps } from "../../types/domain/shell/authenticated-app-header-props.js";

import { AppBrand } from "./app-brand.js";

export function AuthenticatedAppHeader({
  homeHref,
  onOpenNavigation,
  search,
  actions,
}: AuthenticatedAppHeaderProps) {
  const messages = useMessages().authenticatedAppHeader;

  return (
    <AppHeaderLayout>
      <button
        onClick={onOpenNavigation}
        className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-text-subtle transition hover:bg-surface-2 hover:text-primary lg:hidden"
        aria-label={messages.openMenu}
        title={messages.openMenu}
      >
        <Menu className="h-5 w-5" />
      </button>

      <AppBrand href={homeHref} />
      {search}

      <div className="ml-auto flex items-center gap-2">{actions}</div>
    </AppHeaderLayout>
  );
}
