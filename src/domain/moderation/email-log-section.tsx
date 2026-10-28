import { useState } from "react";

import { Mail } from "lucide-react";

import { cn } from "../../lib/utils.js";
import { useMessages } from "../../messages/messages-context.js";
import { ListRowSkeletons } from "../../patterns/skeletons/list-row-skeletons.js";
import type { EmailLogSectionProps } from "../../types/domain/moderation/email-log-section-props.js";
import type { EmailLogStatusFilter } from "../../types/domain/moderation/email-log-status-filter.js";

/** Metadados dos e-mails enviados: útil para ver falha de SMTP sem abrir caixa de mensagens. */
export function EmailLogSection({ loading, emails: all }: EmailLogSectionProps) {
  const messages = useMessages().emailLogSection;
  const [status, setStatus] = useState<EmailLogStatusFilter>("ALL");

  const emails = all.filter((item) => status === "ALL" || item.status === status);

  return (
    <section className="space-y-3">
      <div className="space-y-1">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-text-subtle">
          {messages.title}
        </h2>

        <p className="text-sm text-muted-foreground">{messages.description}</p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {(
          [
            ["ALL", messages.all],
            ["SENT", messages.sent],
            ["FAILED", messages.failed],
          ] as [EmailLogStatusFilter, string][]
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setStatus(id)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-medium transition",
              status === id
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border-soft text-text-subtle hover:border-primary/50 hover:text-primary",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {loading ? (
        <ListRowSkeletons />
      ) : emails.length === 0 ? (
        <div className="rounded-2xl border border-border-soft bg-surface-card p-6 text-center text-sm text-text-subtle">
          <Mail className="mx-auto mb-2 h-6 w-6 text-primary" />

          <>{messages.empty}</>
        </div>
      ) : (
        <ul className="space-y-2">
          {emails.map((email) => (
            <li
              key={email.id}
              className="space-y-1 rounded-2xl border border-border-soft bg-surface-card p-4"
            >
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 font-medium",
                    email.status === "SENT"
                      ? "bg-primary-soft text-primary-text"
                      : "bg-destructive/10 text-destructive",
                  )}
                >
                  {messages.status[email.status] ?? email.status}
                </span>

                <span className="text-text-subtle">{email.createdAtLabel}</span>
              </div>

              <p className="text-sm font-medium text-text-strong">
                {email.kind === "TWO_FACTOR" ? messages.redacted : email.subject}
              </p>

              <p className="text-xs text-text-subtle">
                {messages.to}: {email.toEmail}
                {" · "}
                {email.kind.replaceAll("_", " ").toLowerCase()}
              </p>

              {email.error && (
                <p className="break-words text-xs text-destructive">
                  {messages.error}: {email.error}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
