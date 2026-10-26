import { Bell, BellRing, Loader2 } from "lucide-react";

import { cn } from "../../lib/utils.js";
import { useMessages } from "../../messages/messages-context.js";
import type { PushToggleProps } from "../../types/domain/account/push-toggle-props.js";

import { ACCOUNT_MENU_ITEM_CLASS } from "./account-menu-item-class.js";

/** Liga/desliga as notificacoes push neste dispositivo (item do menu da conta). */
export function PushToggle({ active, busy, error, onToggle }: PushToggleProps) {
  const messages = useMessages().pushToggle;

  return (
    <div>
      <button type="button" onClick={onToggle} disabled={busy} className={ACCOUNT_MENU_ITEM_CLASS}>
        {busy ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : active ? (
          <BellRing className="h-4 w-4" />
        ) : (
          <Bell className="h-4 w-4" />
        )}

        <span>{busy ? messages.working : active ? messages.on : messages.off}</span>
      </button>

      {error && <p className={cn("px-4 pb-2 text-xs text-destructive")}>{error}</p>}
    </div>
  );
}
