import { LogIn } from "lucide-react";

import { useMessages } from "../../messages/messages-context.js";
import { AppHeaderLayout } from "../../patterns/app-shell/app-header-layout.js";
import type { GuestAppHeaderProps } from "../../types/domain/shell/guest-app-header-props.js";
import { AppLink } from "../../ui/app-link.js";
import { Button } from "../../ui/button.js";

import { AppBrand } from "./app-brand.js";

export function GuestAppHeader({ homeHref, loginHref, themeToggle }: GuestAppHeaderProps) {
  const messages = useMessages().guestAppHeader;

  return (
    <AppHeaderLayout>
      <AppBrand href={homeHref} />

      <div className="ml-auto flex items-center gap-2">
        {themeToggle}

        <Button asChild className="rounded-full gap-1.5" size="sm">
          <AppLink href={loginHref}>
            <LogIn className="h-4 w-4" />

            <>{messages.enter}</>
          </AppLink>
        </Button>
      </div>
    </AppHeaderLayout>
  );
}
