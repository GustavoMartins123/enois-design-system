import { useState } from "react";

import { Check, ShieldAlert, Trash2 } from "lucide-react";

import { cn } from "../../lib/utils.js";
import { useMessages } from "../../messages/messages-context.js";
import { ListRowSkeletons } from "../../patterns/skeletons/list-row-skeletons.js";
import type { SuspiciousPostsSectionProps } from "../../types/domain/moderation/suspicious-posts-section-props.js";
import { AppLink } from "../../ui/app-link.js";
import { Button } from "../../ui/button.js";
import { ConfirmDialog } from "../../ui/confirm-dialog.js";
import { EmptyState } from "../../ui/empty-state.js";
import { Input } from "../../ui/input.js";

/** Posts denunciados com score alto: revisão e exclusão em lote com motivo auditável. */
export function SuspiciousPostsSection({
  loading,
  posts: items,
  deletePending,
  onDelete,
}: SuspiciousPostsSectionProps) {
  const messages = useMessages().suspiciousPostsSection;
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [reason, setReason] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);

  const allSelected = items.length > 0 && items.every((item) => selected.has(item.postId));

  const remove = async () => {
    const ok = await onDelete([...selected], reason.trim());
    if (ok) {
      setSelected(new Set());
      setReason("");
    }
    setConfirmOpen(false);
  };

  const toggle = (postId: string) => {
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(postId)) next.delete(postId);
      else next.add(postId);
      return next;
    });
  };

  if (loading) return <ListRowSkeletons />;

  return (
    <section className="space-y-3" aria-label={messages.title}>
      <div className="flex items-center gap-2">
        <ShieldAlert className="h-4 w-4 text-primary" />

        <h2 className="text-sm font-semibold uppercase tracking-widest text-text-subtle">
          {messages.title}
        </h2>
      </div>

      <div className="surface-card space-y-3 p-4">
        <p className="text-sm text-text-subtle">{messages.description}</p>

        {items.length === 0 ? (
          <EmptyState icon={ShieldAlert} title={messages.empty} description={messages.emptyHint} />
        ) : (
          <>
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="w-auto rounded-full"
                onClick={() =>
                  setSelected(allSelected ? new Set() : new Set(items.map((item) => item.postId)))
                }
              >
                {allSelected ? messages.clear : messages.selectAll}
              </Button>

              <span className="text-xs text-text-subtle">{messages.selected(selected.size)}</span>
            </div>

            <Input
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              maxLength={300}
              placeholder={messages.reasonPlaceholder}
            />

            <Button
              variant="destructive"
              size="sm"
              className="w-auto rounded-full gap-2"
              disabled={selected.size === 0 || reason.trim().length < 10}
              onClick={() => setConfirmOpen(true)}
            >
              <Trash2 className="h-4 w-4" />

              <>{messages.delete(selected.size)}</>
            </Button>

            <ul className="space-y-2 pt-1">
              {items.map((item) => {
                const checked = selected.has(item.postId);
                return (
                  <li key={item.reportId}>
                    <label
                      className={cn(
                        "flex cursor-pointer items-start gap-3 rounded-xl border border-border-soft bg-surface-1 p-3",
                        checked && "border-primary/60 bg-primary-soft/40",
                      )}
                    >
                      <span
                        aria-hidden
                        className={cn(
                          "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border",
                          checked
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border-soft bg-surface-card",
                        )}
                      >
                        {checked && <Check className="h-3.5 w-3.5" />}
                      </span>

                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={checked}
                        onChange={() => toggle(item.postId)}
                      />

                      <span className="min-w-0 flex-1 space-y-1">
                        <span className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs text-text-strong">
                            {item.postId.slice(0, 18)}…
                          </span>

                          <span className="rounded-full bg-primary-soft px-2 py-0.5 text-[11px] font-semibold text-primary-text">
                            {messages.score(item.score)}
                          </span>

                          <span className="text-[11px] text-text-subtle">
                            {messages.reason(item.reason)}
                          </span>
                        </span>

                        <span className="flex flex-wrap gap-1">
                          {item.signals.map((signal) => (
                            <span
                              key={signal}
                              className="rounded-full bg-surface-2 px-2 py-0.5 text-[11px] text-text-subtle"
                            >
                              {messages.signals[signal] ?? signal}
                            </span>
                          ))}
                        </span>

                        <AppLink
                          href={item.href}
                          target="_blank"
                          className="inline-block text-xs text-primary hover:underline"
                          onClick={(event) => event.stopPropagation()}
                        >
                          {messages.openPost}
                        </AppLink>
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>

            <ConfirmDialog
              open={confirmOpen}
              onOpenChange={setConfirmOpen}
              title={messages.confirmTitle}
              description={messages.confirmBody(selected.size)}
              confirmLabel={messages.confirm}
              destructive
              pending={deletePending}
              onConfirm={() => void remove()}
            />
          </>
        )}
      </div>
    </section>
  );
}
