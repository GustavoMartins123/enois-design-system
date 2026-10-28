import { cn } from "../../lib/utils.js";
import { useMessages } from "../../messages/messages-context.js";
import type { NotificationItemProps } from "../../types/domain/notifications/notification-item-props.js";
import { AppLink } from "../../ui/app-link.js";
import { UserAvatar } from "../avatar/user-avatar.js";
import { StyledName } from "../name/styled-name.js";

import { notificationMeta } from "./notification-meta.js";

export function NotificationItem({
  notification,
  onMarkAsRead,
  onAcceptConnection,
  stillPendingActorIds,
  acceptingActorId,
  onOpen,
}: NotificationItemProps) {
  const messages = useMessages().notificationItem;
  const kind = notification.kind.toLowerCase();
  const meta = notificationMeta[kind] ?? notificationMeta.connection;
  const Icon = meta.icon;
  const canAcceptConnection = kind === "connection_request" && Boolean(notification.actorId);
  // Já aceito (ou recusado/removido) = não há mais o que aceitar. Sem a lista de pendentes
  // (carregando/erro), mantém o botão como sempre esteve — some só com informação de verdade.
  const stillPending =
    stillPendingActorIds === undefined ||
    (notification.actorId ? stillPendingActorIds.has(notification.actorId) : false);
  const acceptingThis = acceptingActorId != null && acceptingActorId === notification.actorId;

  const markAsRead = () => {
    if (!notification.read) onMarkAsRead(notification.id);
  };

  const handleNavigate = () => {
    markAsRead();
    // The app navigates and closes the popover: left open, it covered the page and the click
    // looked like it only made the notification disappear.
    onOpen(notification.href);
  };

  const handleAcceptConnection = () => {
    if (!notification.actorId) return;

    markAsRead();
    onAcceptConnection(notification.actorId);
  };

  // UserAvatar resolve o caminho do CDN: com <img> cru a foto do usuario nao carregava.
  const avatar = (
    <UserAvatar
      src={notification.actorAvatar}
      alt={notification.actorName ?? ""}
      className="h-9 w-9"
      fallbackClassName={cn("grid h-9 w-9 place-items-center rounded-full", meta.className)}
    />
  );

  const actorProfile = notification.actorHref ? (
    <AppLink
      href={notification.actorHref}
      onClick={markAsRead}
      className="shrink-0 rounded-full transition hover:opacity-80"
      aria-label={messages.openActorProfile(notification.actorName ?? "")}
    >
      {avatar}
    </AppLink>
  ) : (
    <button
      type="button"
      onClick={handleNavigate}
      className="shrink-0 rounded-full transition hover:opacity-80"
    >
      {notification.actorAvatar ? (
        avatar
      ) : (
        <span className={cn("grid h-9 w-9 place-items-center rounded-full", meta.className)}>
          <Icon className="h-4 w-4" />
        </span>
      )}
    </button>
  );

  return (
    <div
      className={cn(
        "border-b border-border-soft px-4 py-3 last:border-b-0",
        notification.read ? "bg-surface-card" : "bg-surface-3",
      )}
    >
      <div className="flex items-start gap-3">
        {actorProfile}

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <p className="min-w-0 text-sm font-normal leading-tight text-text-strong">
              {notification.actorName &&
                (notification.actorHref ? (
                  <AppLink
                    href={notification.actorHref}
                    onClick={markAsRead}
                    className="font-medium hover:underline"
                  >
                    <StyledName
                      name={notification.actorName}
                      style={notification.actorStyle}
                    />{" "}
                  </AppLink>
                ) : (
                  <span className="font-medium">
                    <StyledName
                      name={notification.actorName}
                      style={notification.actorStyle}
                    />{" "}
                  </span>
                ))}
              <span className="text-text-subtle">{notification.title.toLowerCase()}</span>
            </p>
            {!notification.read && (
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
            )}
          </div>

          <button
            type="button"
            onClick={handleNavigate}
            className="mt-1 block w-full break-words text-left text-sm font-normal leading-snug text-text-subtle transition hover:text-text-strong"
          >
            {notification.body}
          </button>

          <div className="mt-3 flex items-center justify-between gap-2">
            <span className="text-xs font-normal text-text-subtle">{notification.timeLabel}</span>

            <div className="flex items-center gap-2">
              {!notification.read && (
                <button
                  type="button"
                  onClick={markAsRead}
                  className="rounded-full px-2 py-1 text-xs font-normal text-text-subtle transition hover:bg-surface-2 hover:text-text-strong"
                >
                  {messages.markRead}
                </button>
              )}

              {canAcceptConnection ? (
                <button
                  type="button"
                  onClick={handleAcceptConnection}
                  // Já aceito: o botão continua no Histórico, mas desabilitado (não dá para
                  // aceitar duas vezes); enquanto aceita, evita o duplo clique.
                  disabled={!stillPending || acceptingThis}
                  className={cn(
                    "rounded-full bg-primary px-3 py-1 text-xs font-normal text-primary-foreground transition",
                    !stillPending || acceptingThis
                      ? "cursor-default opacity-60"
                      : "hover:bg-primary/90",
                  )}
                >
                  {notification.ctaLabel || messages.accept}
                </button>
              ) : notification.ctaLabel ? (
                <button
                  type="button"
                  onClick={handleNavigate}
                  className="rounded-full bg-primary px-3 py-1 text-xs font-normal text-primary-foreground transition hover:bg-primary/90"
                >
                  {notification.ctaLabel}
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
