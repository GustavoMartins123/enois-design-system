import { cn } from "../../lib/utils.js";
import { useMessages } from "../../messages/messages-context.js";
import type { TicketThreadProps } from "../../types/domain/moderation/ticket-thread-props.js";

/**
 * Conversa de um ticket: mensagens enviadas daqui e comentários espelhados da issue do GitHub.
 * Tickets anteriores à conversa mostram a resposta única antiga.
 */
export function TicketThread({
  messages: threadMessages,
  mirrored,
  legacyReply,
  legacyRepliedAtLabel,
  error,
}: TicketThreadProps) {
  const messages = useMessages().ticketThread;

  if (threadMessages.length === 0) {
    if (!legacyReply) return null;

    return (
      <div className="rounded-xl border border-primary/30 bg-primary-soft px-3 py-2">
        <p className="text-xs font-medium text-primary-text">{messages.adminReplyLabel}</p>

        <p className="mt-1 whitespace-pre-wrap break-words text-sm text-text-strong">
          {legacyReply}
        </p>

        {legacyRepliedAtLabel && (
          <p className="mt-1 text-xs text-text-subtle">{legacyRepliedAtLabel}</p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-2 rounded-xl border border-border-soft bg-surface-1 p-3">
      <p className="text-xs font-medium uppercase tracking-wide text-text-subtle">
        {messages.title}
      </p>

      {mirrored && <p className="text-xs text-text-subtle">{messages.hint}</p>}

      <ul className="space-y-2">
        {threadMessages.map((message) => (
          <li key={message.id} className="rounded-lg bg-surface-card px-3 py-2">
            <div className="flex flex-wrap items-center gap-2 text-[11px] text-text-subtle">
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 font-medium",
                  message.direction === "GITHUB"
                    ? "bg-surface-2 text-text-strong"
                    : "bg-primary-soft text-primary-text",
                )}
              >
                {message.direction === "GITHUB" ? messages.github : messages.enois}
              </span>

              {(message.authorGithubLogin || message.authorName) && (
                <span>
                  {message.authorGithubLogin
                    ? `@${message.authorGithubLogin}`
                    : (message.authorName ?? "")}
                </span>
              )}

              <span>{message.createdAtLabel}</span>
            </div>

            <p className="mt-1 whitespace-pre-wrap break-words text-sm text-text-strong">
              {message.body}
            </p>
          </li>
        ))}
      </ul>

      {error && <p className="text-xs text-destructive">{messages.error}</p>}
    </div>
  );
}
