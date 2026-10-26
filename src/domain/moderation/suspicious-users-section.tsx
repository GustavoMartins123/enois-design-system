import { useState } from "react";

import { Check, ShieldAlert, ShieldCheck } from "lucide-react";

import { cn } from "../../lib/utils.js";
import { useMessages } from "../../messages/messages-context.js";
import { ListRowSkeletons } from "../../patterns/skeletons/list-row-skeletons.js";
import type { SuspiciousUsersSectionProps } from "../../types/domain/moderation/suspicious-users-section-props.js";
import { Button } from "../../ui/button.js";
import { ConfirmDialog } from "../../ui/confirm-dialog.js";
import { EmptyState } from "../../ui/empty-state.js";
import { Input } from "../../ui/input.js";

/** Triagem de contas recém-criadas: sinais objetivos, seleção múltipla e banimento em lote. */
export function SuspiciousUsersSection({
  loading,
  error,
  users: items,
  banTypes,
  banPending,
  onBan,
}: SuspiciousUsersSectionProps) {
  const messages = useMessages().suspiciousUsersSection;
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [reason, setReason] = useState("");
  const [type, setType] = useState(banTypes[0] ?? "");
  const [confirmOpen, setConfirmOpen] = useState(false);

  const allSelected = items.length > 0 && items.every((item) => selected.has(item.username));

  const ban = async () => {
    const ok = await onBan([...selected], type, reason.trim());
    setConfirmOpen(false);
    if (ok) {
      setSelected(new Set());
      setReason("");
    }
  };

  const toggle = (username: string) => {
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(username)) next.delete(username);
      else next.add(username);
      return next;
    });
  };

  const toggleAll = () => {
    setSelected(allSelected ? new Set() : new Set(items.map((item) => item.username)));
  };

  if (loading) {
    return <ListRowSkeletons />;
  }

  if (error) {
    return <p className="text-sm text-destructive">{messages.error}</p>;
  }

  return (
    <section className="space-y-4">
      <div className="surface-card space-y-1 p-4">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <ShieldAlert className="h-5 w-5 text-primary" />

          <>{messages.title}</>
        </h2>

        <p className="text-sm text-text-subtle">{messages.description}</p>

        <p className="rounded-xl bg-primary-soft px-3 py-2 text-xs font-medium text-primary-text">
          {messages.autoHint}
        </p>
      </div>

      {items.length === 0 ? (
        <div className="surface-card">
          <EmptyState icon={ShieldCheck} title={messages.empty} description={messages.emptyHint} />
        </div>
      ) : (
        <>
          <div className="surface-card space-y-3 p-4">
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="w-auto rounded-full"
                onClick={toggleAll}
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

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={type}
                onChange={(event) => setType(event.target.value)}
                className="h-9 rounded-full border border-border-soft bg-surface-1 px-3 text-sm text-text-strong"
              >
                {banTypes.map((value) => (
                  <option key={value} value={value}>
                    {messages.banTypes[value] ?? value}
                  </option>
                ))}
              </select>

              <Button
                variant="destructive"
                size="sm"
                className="w-auto rounded-full"
                disabled={selected.size === 0}
                onClick={() => setConfirmOpen(true)}
              >
                {messages.ban(selected.size)}
              </Button>
            </div>
          </div>

          <ul className="space-y-2">
            {items.map((item) => {
              const checked = selected.has(item.username);
              return (
                <li key={item.username}>
                  <label
                    className={cn(
                      "surface-card flex cursor-pointer items-start gap-3 p-3 transition",
                      checked && "border-primary/60 bg-primary-soft/40",
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border",
                        checked
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border-soft bg-surface-1",
                      )}
                    >
                      {checked && <Check className="h-3.5 w-3.5" />}
                    </span>

                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={checked}
                      onChange={() => toggle(item.username)}
                    />

                    <span className="min-w-0 flex-1 space-y-1">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="min-w-0 truncate font-medium text-text-strong">
                          {item.name}
                        </span>

                        <span className="text-xs text-text-subtle">@{item.username}</span>

                        <span className="rounded-full bg-primary-soft px-2 py-0.5 text-[11px] font-semibold text-primary-text">
                          {messages.risk(item.riskScore)}
                        </span>

                        {item.staff && (
                          <span className="rounded-full bg-surface-2 px-2 py-0.5 text-[11px] font-semibold text-text-strong">
                            {messages.staffChip}
                          </span>
                        )}
                      </span>

                      <span className="block text-xs text-text-subtle">
                        {messages.createdAt(item.createdAtLabel)}
                        {" · "}
                        {messages.counts(item.posts, item.comments, item.reportsAgainst)}
                      </span>

                      <span className="flex flex-wrap gap-1 pt-0.5">
                        {item.signals.map((signal) => (
                          <span
                            key={signal}
                            className="rounded-full bg-surface-2 px-2 py-0.5 text-[11px] text-text-subtle"
                          >
                            {messages.signals[signal] ?? signal}
                          </span>
                        ))}
                      </span>
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
            description={messages.confirmBody(selected.size, type)}
            confirmLabel={messages.confirm}
            destructive
            pending={banPending}
            onConfirm={() => void ban()}
          />
        </>
      )}
    </section>
  );
}
