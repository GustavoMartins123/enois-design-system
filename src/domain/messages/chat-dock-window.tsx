import { X } from "lucide-react";

import { useMessages } from "../../messages/messages-context.js";
import type { ChatDockWindowProps } from "../../types/domain/messages/chat-dock-window-props.js";

/** Mini-janela de conversa do dock: a moldura flutuante em volta do filão. */
export function ChatDockWindow({ loading, onClose, children }: ChatDockWindowProps) {
  const messages = useMessages().chatDock;

  if (loading) {
    return (
      <div className="flex h-[32rem] w-[22rem] flex-col overflow-hidden rounded-t-2xl border border-border-soft bg-surface-card shadow-xl">
        <div className="flex items-center justify-between border-b border-border-soft px-4 py-3">
          <span className="h-4 w-24 animate-pulse rounded bg-surface-2" />

          <button
            type="button"
            onClick={onClose}
            className="grid h-7 w-7 place-items-center rounded-full text-text-subtle transition hover:bg-surface-2"
            aria-label={messages.close}
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <span className="text-xs text-text-subtle">{messages.loading}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-[32rem] w-[22rem] flex-col overflow-hidden rounded-t-2xl border border-border-soft bg-surface-card shadow-xl">
      <button
        type="button"
        onClick={onClose}
        className="absolute right-2 top-2 z-10 grid h-7 w-7 place-items-center rounded-full bg-surface-card/80 text-text-subtle shadow-sm transition hover:bg-surface-2 hover:text-text-strong"
        aria-label={messages.close}
      >
        <X className="h-3.5 w-3.5" />
      </button>

      {children}
    </div>
  );
}
