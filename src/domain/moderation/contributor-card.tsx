import { Mail } from "lucide-react";

import { cn } from "../../lib/utils.js";
import { useMessages } from "../../messages/messages-context.js";
import type { ContributorCardProps } from "../../types/domain/moderation/contributor-card-props.js";
import { Button } from "../../ui/button.js";
import { GithubIcon } from "../../ui/github-icon.js";

const STATUS_BADGE: Record<string, string> = {
  NEW: "bg-primary-soft text-primary-text",
  REVIEWING: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  APPROVED: "bg-growth/10 text-growth",
  REJECTED: "bg-destructive/10 text-destructive",
};

/** Card de uma candidatura de contribuição na fila do painel. */
export function ContributorCard({
  application,
  pending,
  saveError,
  onReview,
  onApprove,
  onReject,
}: ContributorCardProps) {
  const messages = useMessages().contributorsSection;
  const status = application.status;
  const decidida = status === "APPROVED" || status === "REJECTED";

  return (
    <li className="space-y-3 rounded-2xl border border-border-soft bg-surface-card p-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-text-strong">{application.name}</p>

          <p className="text-xs text-text-subtle">{application.createdAtLabel}</p>
        </div>

        <span
          className={cn("rounded-full px-2 py-0.5 text-[11px] font-semibold", STATUS_BADGE[status])}
        >
          {messages.status[status]}
        </span>
      </div>

      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-text-subtle">
          {messages.contact}
        </p>

        <div className="flex flex-wrap items-center gap-3 text-xs">
          <a
            href={`https://github.com/${application.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-primary hover:underline"
          >
            <GithubIcon className="h-3.5 w-3.5" />@{application.github}
          </a>

          <a
            href={`mailto:${application.email}`}
            className="inline-flex items-center gap-1 text-text-subtle hover:text-primary"
          >
            <Mail className="h-3.5 w-3.5" />
            {application.email}
          </a>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 text-xs">
        {application.area && (
          <span className="rounded-full bg-primary-soft px-2 py-0.5 text-primary-text">
            {messages.area}: {application.area}
          </span>
        )}

        {application.experience && (
          <span className="rounded-full bg-surface-2 px-2 py-0.5 text-text-subtle">
            {messages.experience}: {application.experience}
          </span>
        )}

        <span className="text-text-subtle">
          {messages.acceptedAt}: {application.acceptedTermsAtLabel}
        </span>
      </div>

      {application.message && (
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-text-subtle">
            {messages.title}
          </p>

          <p className="whitespace-pre-wrap text-sm leading-relaxed text-text-strong">
            {application.message}
          </p>
        </div>
      )}

      {!decidida ? (
        <div className="flex flex-wrap gap-2">
          {status === "NEW" && (
            <Button
              size="sm"
              variant="outline"
              className="rounded-full"
              disabled={pending}
              onClick={onReview}
            >
              {messages.review}
            </Button>
          )}

          <Button size="sm" className="rounded-full" disabled={pending} onClick={onApprove}>
            {messages.approve}
          </Button>

          <Button
            size="sm"
            variant="destructive"
            className="rounded-full"
            disabled={pending}
            onClick={onReject}
          >
            {messages.reject}
          </Button>
        </div>
      ) : (
        <p className="text-xs text-text-subtle">{messages.done}</p>
      )}

      {saveError && <p className="text-xs text-destructive">{messages.saveError}</p>}
    </li>
  );
}
