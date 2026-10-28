import { LifeBuoy } from "lucide-react";

import { safeHref } from "../../lib/safe-href.js";
import { useMessages } from "../../messages/messages-context.js";
import { ListRowSkeletons } from "../../patterns/skeletons/list-row-skeletons.js";
import type { SupportTicketsSectionProps } from "../../types/domain/moderation/support-tickets-section-props.js";
import { Button } from "../../ui/button.js";

import { FilterChip } from "./filter-chip.js";

/**
 * Tickets de suporte do painel central. A aba "Issues" usa o mesmo componente com `lockedCategory`
 * em BUG: é a mesma fila, só enxergada pela categoria de problema.
 */
export function SupportTicketsSection({
  history,
  locked,
  categories,
  category,
  onCategoryChange,
  statusFilters,
  status,
  onStatusChange,
  loading,
  tickets: visible,
  pending,
  onStart,
  onResolve,
  onReopen,
  renderThread,
  renderReply,
}: SupportTicketsSectionProps) {
  const messages = useMessages().supportTicketsSection;
  const statusFilterLabels: Record<string, string> = {
    ALL: messages.statusAll,
    OPEN: messages.statusOpen,
    IN_PROGRESS: messages.statusInProgress,
  };

  return (
    <section className="space-y-3">
      <div className="space-y-1">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-text-subtle">
          {history ? messages.historyTitle : locked ? messages.issuesTitle : messages.title}
        </h2>

        <p className="text-sm text-muted-foreground">
          {history ? messages.historyDescription : messages.description}
        </p>
      </div>

      <div className="space-y-2">
        {!locked && (
          <div className="flex flex-wrap gap-1.5">
            <FilterChip
              active={category === undefined}
              onClick={() => onCategoryChange(undefined)}
              label={messages.all}
            />

            {categories.map((value) => (
              <FilterChip
                key={value}
                active={category === value}
                onClick={() => onCategoryChange(value)}
                label={messages.categories[value]}
              />
            ))}
          </div>
        )}

        {!history && (
          <div className="flex flex-wrap gap-1.5">
            {statusFilters.map((id) => (
              <FilterChip
                key={id}
                active={status === id}
                onClick={() => onStatusChange(id)}
                label={statusFilterLabels[id]}
              />
            ))}
          </div>
        )}
      </div>

      {loading ? (
        <ListRowSkeletons />
      ) : visible.length === 0 ? (
        <div className="rounded-2xl border border-border-soft bg-surface-card p-6 text-center text-sm text-text-subtle">
          <LifeBuoy className="mx-auto mb-2 h-6 w-6 text-primary" />

          <>{history ? messages.historyEmpty : messages.empty}</>
        </div>
      ) : (
        <ul className="space-y-3">
          {visible.map((ticket) => (
            <li
              key={ticket.id}
              className="space-y-3 rounded-2xl border border-border-soft bg-surface-card p-4"
            >
              <div className="flex flex-wrap items-center gap-2 text-xs text-text-subtle">
                <span className="rounded-full bg-surface-2 px-2 py-0.5 font-medium text-text-strong">
                  {messages.categories[ticket.category] ?? ticket.category}
                </span>

                <span className="rounded-full border border-border-soft px-2 py-0.5">
                  {ticket.status === "OPEN"
                    ? messages.statusOpen
                    : ticket.status === "IN_PROGRESS"
                      ? messages.statusInProgress
                      : messages.statusClosed}
                </span>

                <span>{ticket.createdAtLabel}</span>

                {ticket.githubIssueNumber != null && (
                  <a
                    href={safeHref(ticket.githubIssueUrl) ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-border-soft px-2 py-0.5 text-primary hover:underline"
                  >
                    {messages.githubIssue} #{ticket.githubIssueNumber}
                  </a>
                )}
              </div>

              <div className="min-w-0">
                <p className="text-sm font-semibold text-text-strong">{ticket.subject}</p>

                <p className="mt-0.5 text-xs text-text-subtle">
                  {messages.from}:{" "}
                  <a
                    href={`mailto:${ticket.contactEmail}`}
                    className="text-primary hover:underline"
                  >
                    {ticket.contactEmail}
                  </a>
                </p>
              </div>

              <p className="max-h-48 overflow-y-auto whitespace-pre-wrap break-words rounded-xl bg-surface-2 px-3 py-2 text-sm text-text-strong">
                {ticket.message || messages.noMessage}
              </p>

              {ticket.imageUrl && (
                <a
                  href={safeHref(ticket.imageUrl) ?? undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-xs text-primary hover:underline"
                >
                  {messages.image}
                </a>
              )}

              <div className="flex flex-wrap gap-2">
                {ticket.status === "OPEN" && (
                  <Button
                    size="sm"
                    className="rounded-full"
                    disabled={pending}
                    onClick={() => onStart(ticket.id)}
                  >
                    {messages.start}
                  </Button>
                )}

                {ticket.status === "IN_PROGRESS" && (
                  <Button
                    size="sm"
                    className="rounded-full"
                    disabled={pending}
                    onClick={() => onResolve(ticket.id)}
                  >
                    {messages.resolve}
                  </Button>
                )}

                {ticket.status === "CLOSED" && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-full"
                    disabled={pending}
                    onClick={() => onReopen(ticket.id)}
                  >
                    {messages.reopen}
                  </Button>
                )}
              </div>

              {renderThread(ticket)}

              {renderReply(ticket.id)}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
