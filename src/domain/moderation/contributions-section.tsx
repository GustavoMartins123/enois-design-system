import { useState } from "react";

import {
  AlertTriangle,
  CheckCircle2,
  GitPullRequest,
  Loader2,
  RefreshCw,
  ShieldCheck,
  ShieldX,
} from "lucide-react";

import { safeHref } from "../../lib/safe-href.js";
import { cn } from "../../lib/utils.js";
import { useMessages } from "../../messages/messages-context.js";
import { ListRowSkeletons } from "../../patterns/skeletons/list-row-skeletons.js";
import type { ContributionsSectionProps } from "../../types/domain/moderation/contributions-section-props.js";
import { Button } from "../../ui/button.js";
import { Textarea } from "../../ui/textarea.js";

import { FilterChip } from "./filter-chip.js";

const FILTERS = ["ALL", "PENDING", "VALIDATED", "REJECTED", "CONTESTED", "REVOKED"];

const KINDS = ["ALL", "PULL_REQUEST", "ISSUE"];

/** Labels vêm como array JSON da API; texto que não é JSON aparece como veio. */
function formatLabels(labels: string | null): string {
  if (!labels) return "";
  try {
    const parsed: unknown = JSON.parse(labels);
    return Array.isArray(parsed) ? parsed.join(", ") : "";
  } catch {
    return labels;
  }
}

/**
 * Fila de evidências do GitHub. O sync só importa; validar é uma decisão humana registrada na
 * auditoria do backend. O frontend nunca concede selo por conta própria.
 */
export function ContributionsSection({
  filter,
  onFilterChange,
  kind,
  onKindChange,
  loading,
  loadError,
  fetching,
  onRefresh,
  contributions: rows,
  reviewPending: busy,
  onReview,
  syncPending,
  onSync,
  report,
  repositories,
  repositoryPending,
  onToggleRepository,
  actionError,
  actionErrorMessage,
}: ContributionsSectionProps) {
  const messages = useMessages().contributionsSection;
  const [notes, setNotes] = useState<Record<string, string>>({});

  return (
    <section className="space-y-4">
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

      <div className="flex flex-wrap items-center gap-2">
        <Button
          size="sm"
          className="rounded-full gap-1.5"
          disabled={syncPending}
          onClick={() => onSync("incremental")}
        >
          {syncPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <GitPullRequest className="h-4 w-4" />
          )}

          <>{syncPending ? messages.syncing : messages.sync}</>
        </Button>

        <Button
          size="sm"
          variant="outline"
          className="rounded-full"
          disabled={syncPending}
          onClick={() => onSync("dry")}
        >
          {messages.syncDryRun}
        </Button>

        <Button
          size="sm"
          variant="outline"
          className="rounded-full"
          disabled={syncPending}
          onClick={() => onSync("full")}
        >
          {messages.syncFull}
        </Button>
      </div>

      {report && (
        <div className="rounded-2xl border border-border-soft bg-surface-card p-4 text-sm">
          <p className="font-medium text-text-strong">
            {messages.syncDone(
              report.created,
              report.updated,
              report.fetched,
              report.issuesCreated,
              report.issuesUpdated,
              report.issuesFetched,
            )}
          </p>

          <p className="mt-1 text-xs text-text-subtle">
            {report.repositories.join(" · ")} ·{" "}
            {messages.syncDetails(report.detailsFetched, report.revertedFlagged)}
          </p>

          {report.rateLimited && (
            <p className="mt-1 flex items-center gap-1 text-xs text-amber-600">
              <AlertTriangle className="h-3.5 w-3.5" />
              {messages.rateLimited}
            </p>
          )}

          {report.errors.length > 0 && (
            <p className="mt-1 text-xs text-destructive">{report.errors.join(" · ")}</p>
          )}
        </div>
      )}

      <div className="flex flex-wrap gap-1.5">
        {FILTERS.map((id) => (
          <FilterChip
            key={id}
            active={filter === id}
            onClick={() => onFilterChange(id)}
            label={id === "ALL" ? messages.filterAll : messages.status[id]}
          />
        ))}

        <span className="mx-1 h-6 w-px self-center bg-border-soft" aria-hidden />

        {KINDS.map((id) => (
          <FilterChip
            key={id}
            active={kind === id}
            onClick={() => onKindChange(id)}
            label={id === "ALL" ? messages.kindAll : messages.kind[id]}
          />
        ))}
      </div>

      {actionError && (
        <p className="rounded-xl bg-destructive/10 px-4 py-2 text-sm text-destructive">
          {actionErrorMessage || messages.saveError}
        </p>
      )}

      {loading ? (
        <ListRowSkeletons />
      ) : loadError ? (
        <p className="rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {messages.error}
        </p>
      ) : rows.length === 0 ? (
        <div className="rounded-2xl border border-border-soft bg-surface-card p-6 text-center text-sm text-text-subtle">
          <GitPullRequest className="mx-auto mb-2 h-6 w-6 text-primary" />

          <>{messages.empty}</>
        </div>
      ) : (
        <ul className="space-y-2">
          {rows.map((contribution) => {
            const note = notes[contribution.id] ?? "";
            const labels = formatLabels(contribution.labels);
            const review = (status: string) => onReview(contribution.id, status, note);

            return (
              <li
                key={contribution.id}
                className="space-y-3 rounded-2xl border border-border-soft bg-surface-card p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="min-w-0">
                    <a
                      href={safeHref(contribution.url) ?? undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-text-strong hover:text-primary hover:underline"
                    >
                      {contribution.title}
                    </a>

                    <p className="mt-0.5 text-xs text-text-subtle">
                      {messages.kindLabel[contribution.kind]} · {contribution.repository} #
                      {contribution.number}
                      {contribution.username
                        ? ` · @${contribution.username}`
                        : ` · ${messages.noUser}`}
                      {` · @${contribution.githubLogin}`}
                    </p>
                  </div>

                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-xs font-medium",
                      contribution.status === "VALIDATED"
                        ? "bg-growth/10 text-growth"
                        : contribution.status === "REJECTED" || contribution.status === "REVOKED"
                          ? "bg-destructive/10 text-destructive"
                          : "bg-primary-soft text-primary-text",
                    )}
                  >
                    {messages.status[contribution.status] ?? contribution.status}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 text-xs text-text-subtle">
                  <span>
                    {contribution.kind === "ISSUE" ? messages.closedAt : messages.mergedAt}:{" "}
                    {contribution.happenedAtLabel ?? "—"}
                  </span>

                  {contribution.kind === "PULL_REQUEST" && (
                    <>
                      <span>
                        {messages.tests}: {contribution.hasTests ? messages.yes : messages.no}
                      </span>

                      <span>{messages.changedFiles(contribution.changedFiles)}</span>

                      <span>
                        +{contribution.additions} / -{contribution.deletions}
                      </span>

                      <span>{messages.score(contribution.score)}</span>
                    </>
                  )}

                  {labels && (
                    <span>
                      {messages.labels}: {labels}
                    </span>
                  )}

                  {contribution.reverted && (
                    <span className="inline-flex items-center gap-1 text-amber-600">
                      <AlertTriangle className="h-3.5 w-3.5" />
                      {messages.reverted}
                    </span>
                  )}
                </div>

                <Textarea
                  rows={2}
                  value={note}
                  onChange={(event) =>
                    setNotes((current) => ({ ...current, [contribution.id]: event.target.value }))
                  }
                  placeholder={messages.reviewNotePlaceholder}
                  maxLength={2000}
                />

                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    className="rounded-full gap-1.5"
                    disabled={busy || contribution.status === "VALIDATED"}
                    onClick={() => review("VALIDATED")}
                  >
                    <ShieldCheck className="h-3.5 w-3.5" />
                    {messages.validate}
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-full gap-1.5"
                    disabled={busy || contribution.status === "REJECTED"}
                    onClick={() => review("REJECTED")}
                  >
                    <ShieldX className="h-3.5 w-3.5" />
                    {messages.reject}
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-full"
                    disabled={busy || contribution.status === "CONTESTED"}
                    onClick={() => review("CONTESTED")}
                  >
                    {messages.contest}
                  </Button>

                  <Button
                    size="sm"
                    variant="ghost"
                    className="rounded-full text-destructive"
                    disabled={busy || contribution.status === "REVOKED"}
                    onClick={() => review("REVOKED")}
                  >
                    {messages.revokeEvidence}
                  </Button>
                </div>

                {contribution.reviewNote && (
                  <p className="flex items-start gap-1 text-xs text-text-subtle">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    {contribution.reviewNote}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      )}

      <div className="space-y-2 border-t border-border-soft pt-4">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-text-subtle">
          {messages.repositoriesTitle}
        </h3>

        {repositories.map((repository) => (
          <div
            key={repository.repository}
            className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border-soft px-3 py-2 text-sm"
          >
            <span className="font-mono text-xs text-text-strong">{repository.repository}</span>

            <div className="flex items-center gap-2">
              <span className="text-xs text-text-subtle">
                {repository.enabled ? messages.repositoryOn : messages.repositoryOff}
              </span>

              <Button
                size="sm"
                variant="outline"
                className="rounded-full"
                disabled={repositoryPending}
                onClick={() => onToggleRepository(repository.repository, !repository.enabled)}
              >
                {repository.enabled ? messages.disableRepository : messages.enableRepository}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
