import { cn } from "../../lib/utils.js";
import { useMessages } from "../../messages/messages-context.js";
import type { MySupportRequestsProps } from "../../types/domain/support/my-support-requests-props.js";

const STATUS_STYLE: Record<string, string> = {
  OPEN: "bg-surface-2 text-text-strong",
  IN_PROGRESS: "bg-primary-soft text-primary-text",
  CLOSED: "bg-surface-2 text-text-subtle",
};

/**
 * Histórico do solicitante na própria página de suporte: é por aqui que ele vê o pedido
 * concluído (pelo painel ou pela issue do GitHub) sem depender só da notificação.
 */
export function MySupportRequests({ loading, tickets }: MySupportRequestsProps) {
  const messages = useMessages().mySupportRequests;

  return (
    <section className="space-y-2">
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-widest text-text-subtle">
          {messages.title}
        </h2>

        <p className="text-sm text-muted-foreground">{messages.description}</p>
      </div>

      {loading ? (
        <p className="text-sm text-text-subtle">{messages.loading}</p>
      ) : tickets.length === 0 ? (
        <p className="rounded-2xl border border-border-soft bg-surface-card p-4 text-sm text-text-subtle">
          {messages.empty}
        </p>
      ) : (
        <ul className="space-y-2">
          {tickets.map((ticket) => (
            <li
              key={ticket.id}
              className="space-y-2 rounded-2xl border border-border-soft bg-surface-card p-4"
            >
              <div className="flex flex-wrap items-center gap-2 text-xs text-text-subtle">
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 font-medium",
                    STATUS_STYLE[ticket.status],
                  )}
                >
                  {messages.status[ticket.status] ?? ticket.status}
                </span>

                <span>{ticket.createdAtLabel}</span>
              </div>

              <p className="break-words text-sm font-semibold text-text-strong">{ticket.subject}</p>

              <p className="whitespace-pre-wrap break-words text-sm text-text-subtle">
                {ticket.message}
              </p>

              {ticket.adminReply && (
                <div className="rounded-xl border border-primary/30 bg-primary-soft px-3 py-2">
                  <p className="text-xs font-medium text-primary-text">
                    {messages.adminReplyLabel}
                  </p>

                  <p className="mt-1 whitespace-pre-wrap break-words text-sm text-text-strong">
                    {ticket.adminReply}
                  </p>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
