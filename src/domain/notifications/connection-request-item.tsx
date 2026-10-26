import { Check, X } from "lucide-react";

import { useAdapters } from "../../adapters/adapters-context.js";
import { useMessages } from "../../messages/messages-context.js";
import type { ConnectionRequestItemProps } from "../../types/domain/notifications/connection-request-item-props.js";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar.js";

/** Card de solicitação de conexão dentro do sininho. O perfil já vem resolvido pelo pai. */
export function ConnectionRequestItem({
  request,
  onAccept,
  onReject,
  accepting,
  rejecting,
  onNavigate,
}: ConnectionRequestItemProps) {
  const messages = useMessages().connectionRequestItem;
  const { resolveMediaUrl } = useAdapters();
  const profile = request.profile;
  const name = profile?.name ?? messages.someone;
  const username = profile?.username;
  const avatar = profile?.avatar;
  const headline = profile?.headline;

  return (
    <div className="flex items-start gap-3 border-b border-border-soft px-4 py-3 last:border-b-0">
      <button
        type="button"
        onClick={() => {
          if (request.profileHref) {
            onNavigate();
            window.location.href = request.profileHref;
          }
        }}
        className="shrink-0"
      >
        <Avatar className="h-10 w-10">
          {avatar && <AvatarImage src={resolveMediaUrl(avatar)} alt={name} />}
          <AvatarFallback className="bg-surface-2 text-xs text-text-subtle">
            {name[0]?.toUpperCase() ?? "?"}
          </AvatarFallback>
        </Avatar>
      </button>

      <div className="min-w-0 flex-1">
        <p className="text-sm">
          <span className="font-medium text-text-strong">{name}</span>
          {username && <span className="ml-1 text-text-subtle">@{username}</span>}
        </p>

        {headline && <p className="mt-0.5 truncate text-xs text-text-subtle">{headline}</p>}

        <div className="mt-2 flex gap-2">
          <button
            type="button"
            disabled={accepting || rejecting}
            onClick={() => onAccept(request.fromUserId)}
            className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground transition hover:bg-primary/90 disabled:opacity-60"
          >
            <Check className="h-3 w-3" />
            {messages.accept}
          </button>

          <button
            type="button"
            disabled={accepting || rejecting}
            onClick={() => onReject(request.fromUserId)}
            className="inline-flex items-center gap-1 rounded-full border border-border-soft px-3 py-1 text-xs font-medium text-text-subtle transition hover:bg-surface-2 hover:text-text-strong disabled:opacity-60"
          >
            <X className="h-3 w-3" />
            {messages.reject}
          </button>
        </div>
      </div>

      <span className="shrink-0 text-xs text-text-subtle">{request.dateLabel}</span>
    </div>
  );
}
