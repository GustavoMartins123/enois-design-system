import { Loader2, Store } from "lucide-react";

import { useMessages } from "../../messages/messages-context.js";
import type { PurchasedThemesProps } from "../../types/domain/appearance/purchased-themes-props.js";
import { Button } from "../../ui/button.js";

/**
 * Temas que a pessoa comprou na loja. Abrir o conteúdo comprado e aplicá-lo fica com o app;
 * aqui só a lista e o botão de cada tema.
 */
export function PurchasedThemes({ themes, applyingItemId = null, onApply }: PurchasedThemesProps) {
  const messages = useMessages().purchasedThemes;
  const pending = applyingItemId !== null;

  return (
    <section className="space-y-2 border-t border-border-soft pt-3">
      <div className="space-y-0.5">
        <h3 className="text-xs font-medium text-text-strong">{messages.title}</h3>

        <p className="text-xs font-normal text-text-subtle">{messages.hint}</p>
      </div>

      {themes.length === 0 ? (
        <p className="text-xs text-text-subtle">{messages.empty}</p>
      ) : (
        <ul className="flex flex-wrap gap-2">
          {themes.map((theme) => (
            <li key={theme.itemId}>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-auto rounded-full gap-1.5 text-xs"
                disabled={pending}
                onClick={() => onApply(theme.itemId)}
              >
                {applyingItemId === theme.itemId ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Store className="h-3.5 w-3.5" />
                )}

                <>{theme.title ?? messages.apply}</>
              </Button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
