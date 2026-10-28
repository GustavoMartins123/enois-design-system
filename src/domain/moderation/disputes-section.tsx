import { ShieldAlert } from "lucide-react";

import { useMessages } from "../../messages/messages-context.js";
import { ListRowSkeletons } from "../../patterns/skeletons/list-row-skeletons.js";
import type { DisputesSectionProps } from "../../types/domain/moderation/disputes-section-props.js";
import { Button } from "../../ui/button.js";

/**
 * Contestações de transferência: deferir reverte e pune o golpista; rejeitar pune quem contestou
 * de má-fé. O backend decide os dois lados; aqui é só a fila.
 */
export function DisputesSection({
  loading,
  disputes,
  pending,
  onUphold,
  onReject,
}: DisputesSectionProps) {
  const messages = useMessages().disputesSection;

  return (
    <section className="space-y-3" aria-label={messages.title}>
      <div className="flex items-center gap-2">
        <ShieldAlert className="h-4 w-4 text-primary" />

        <h2 className="text-sm font-semibold uppercase tracking-widest text-text-subtle">
          {messages.title}
        </h2>
      </div>

      {loading ? (
        <ListRowSkeletons />
      ) : disputes.length === 0 ? (
        <p className="rounded-2xl border border-border-soft bg-surface-card p-4 text-sm text-text-subtle">
          {messages.empty}
        </p>
      ) : (
        <ul className="space-y-3">
          {disputes.map((disputa) => (
            <li
              key={disputa.id}
              className="space-y-2 rounded-2xl border border-border-soft bg-surface-card p-4"
            >
              <p className="text-sm font-semibold">
                {messages.transfer(disputa.amountLabel, disputa.reason)}
              </p>

              <p className="text-xs text-text-subtle">
                {messages.reference(disputa.createdAtLabel, disputa.entryRef.slice(0, 16))}
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                <Button
                  size="sm"
                  className="rounded-full"
                  disabled={pending}
                  onClick={() => onUphold(disputa.id)}
                >
                  {messages.uphold}
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-full"
                  disabled={pending}
                  onClick={() => onReject(disputa.id)}
                >
                  {messages.reject}
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
