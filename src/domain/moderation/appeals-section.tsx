import { Gavel } from "lucide-react";

import { useMessages } from "../../messages/messages-context.js";
import { ListRowSkeletons } from "../../patterns/skeletons/list-row-skeletons.js";
import type { AppealsSectionProps } from "../../types/domain/moderation/appeals-section-props.js";
import { Button } from "../../ui/button.js";
import { EmptyState } from "../../ui/empty-state.js";

/** Recursos de penalidade automática: aprovar libera; negar converte em banimento. */
export function AppealsSection({
  loading,
  appeals,
  pending,
  onApprove,
  onDeny,
}: AppealsSectionProps) {
  const messages = useMessages().appealsSection;

  return (
    <section className="space-y-3">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-text-subtle">
        {messages.title}
      </h2>

      <p className="text-sm text-muted-foreground">{messages.description}</p>

      {loading ? (
        <ListRowSkeletons />
      ) : appeals.length === 0 ? (
        <div className="rounded-2xl border border-border-soft bg-surface-card">
          <EmptyState icon={Gavel} title={messages.empty} />
        </div>
      ) : (
        <ul className="space-y-3">
          {appeals.map((item) => (
            <li
              key={item.id}
              className="space-y-2 rounded-2xl border border-border-soft bg-surface-card p-4"
            >
              <p className="text-sm">{item.message}</p>

              <p className="text-xs text-text-subtle">{item.createdAtLabel}</p>

              <div className="flex flex-wrap gap-2 pt-1">
                <Button
                  size="sm"
                  className="rounded-full"
                  disabled={pending}
                  onClick={() => onApprove(item.id)}
                >
                  {messages.approve}
                </Button>

                <Button
                  size="sm"
                  variant="destructive"
                  className="rounded-full"
                  disabled={pending}
                  onClick={() => onDeny(item.id)}
                >
                  {messages.deny}
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
