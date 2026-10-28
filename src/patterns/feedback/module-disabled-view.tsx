import { PauseCircle } from "lucide-react";

import { useMessages } from "../../messages/messages-context.js";
import type { ModuleDisabledViewProps } from "../../types/patterns/module-disabled-view-props.js";
import { AppLink } from "../../ui/app-link.js";
import { Button } from "../../ui/button.js";

/**
 * Acesso direto a uma área desativada nas preferências: em vez de uma tela quebrada, a
 * explicação e o atalho para reativar.
 */
export function ModuleDisabledView({ onReenable, backHref }: ModuleDisabledViewProps) {
  const messages = useMessages().moduleDisabledView;

  return (
    <div className="grid min-h-screen place-items-center px-6">
      <div className="flex w-full max-w-sm flex-col items-center text-center">
        <PauseCircle className="h-10 w-10 text-text-subtle" />

        <h1 className="mt-4 text-lg font-semibold tracking-tight">{messages.title}</h1>

        <p className="mt-2 text-sm text-muted-foreground">{messages.body}</p>

        <Button className="mt-6 w-full rounded-full" onClick={onReenable}>
          {messages.reenable}
        </Button>

        <AppLink
          href={backHref}
          className="mt-3 text-sm text-muted-foreground underline-offset-4 hover:underline"
        >
          {messages.backToFeed}
        </AppLink>
      </div>
    </div>
  );
}
