import { RefreshCw, UserPlus } from "lucide-react";

import { cn } from "../../lib/utils.js";
import { useMessages } from "../../messages/messages-context.js";
import { ListRowSkeletons } from "../../patterns/skeletons/list-row-skeletons.js";
import type { ContributorsSectionProps } from "../../types/domain/moderation/contributors-section-props.js";
import { Button } from "../../ui/button.js";

/**
 * Fila de quem se ofereceu para contribuir, no mesmo formato da fila de candidaturas do painel:
 * card com os dados rotulados e ações claras (análise -> aprovação/recusa), em vez de um seletor
 * cru de status. Estados finais (aprovada/recusada) mostram só o selo.
 */
export function ContributorsSection({
  loading,
  error,
  fetching,
  empty,
  onRefresh,
  children,
}: ContributorsSectionProps) {
  const messages = useMessages().contributorsSection;

  return (
    <section className="space-y-3">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-text-subtle">
            {messages.title}
          </h2>

          <p className="text-sm text-muted-foreground">{messages.description}</p>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="rounded-full"
          aria-label={messages.refresh}
          title={messages.refresh}
          onClick={onRefresh}
        >
          <RefreshCw className={cn("h-4 w-4", fetching && "animate-spin")} />
        </Button>
      </div>

      {loading ? (
        <ListRowSkeletons />
      ) : error ? (
        <p className="rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {messages.error}
        </p>
      ) : empty ? (
        <div className="rounded-2xl border border-border-soft bg-surface-card p-6 text-center text-sm text-text-subtle">
          <UserPlus className="mx-auto mb-2 h-6 w-6 text-primary" />

          <>{messages.empty}</>
        </div>
      ) : (
        <ul className="space-y-3">{children}</ul>
      )}
    </section>
  );
}
