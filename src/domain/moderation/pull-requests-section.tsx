import { useState } from "react";

import { GitPullRequest, Loader2 } from "lucide-react";

import { safeHref } from "../../lib/safe-href.js";
import { useMessages } from "../../messages/messages-context.js";
import { ListRowSkeletons } from "../../patterns/skeletons/list-row-skeletons.js";
import type { PullRequestData } from "../../types/domain/moderation/pull-request-data.js";
import type { PullRequestReviewDecision } from "../../types/domain/moderation/pull-request-review-decision.js";
import type { PullRequestsSectionProps } from "../../types/domain/moderation/pull-requests-section-props.js";
import { Button } from "../../ui/button.js";
import { Textarea } from "../../ui/textarea.js";

/**
 * Fila de revisão dos PRs abertos dos repositórios oficiais. A revisão vai para o GitHub em nome de
 * quem revisa quando o vínculo tem escrita; sem isso o backend usa o token de serviço.
 */
export function PullRequestsSection({
  loading,
  pulls,
  showWriteHint,
  connectWritePending,
  onConnectWrite,
  reviewing,
  onReview,
}: PullRequestsSectionProps) {
  const messages = useMessages().pullRequestsSection;

  return (
    <section className="space-y-3">
      <div className="space-y-1">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-text-subtle">
          {messages.title}
        </h2>

        <p className="text-sm text-muted-foreground">{messages.description}</p>
      </div>

      {showWriteHint && (
        <div className="space-y-2 rounded-2xl border border-amber-500/40 bg-amber-500/10 p-4">
          <p className="text-sm text-text-strong">{messages.writeHint}</p>

          <Button
            size="sm"
            className="rounded-full"
            disabled={connectWritePending}
            onClick={onConnectWrite}
          >
            {connectWritePending ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <GitPullRequest className="h-3.5 w-3.5" />
            )}

            <>{messages.connectWrite}</>
          </Button>
        </div>
      )}

      {loading ? (
        <ListRowSkeletons />
      ) : pulls.length === 0 ? (
        <div className="rounded-2xl border border-border-soft bg-surface-card p-6 text-center text-sm text-text-subtle">
          <GitPullRequest className="mx-auto mb-2 h-6 w-6 text-primary" />

          <>{messages.empty}</>
        </div>
      ) : (
        <ul className="space-y-3">
          {pulls.map((pull) => {
            const key = `${pull.repository}#${pull.number}`;

            return (
              <PullRequestRow
                key={key}
                pull={pull}
                pendingDecision={reviewing?.key === key ? reviewing.decision : null}
                onReview={onReview}
              />
            );
          })}
        </ul>
      )}
    </section>
  );
}

function PullRequestRow({
  pull,
  pendingDecision,
  onReview,
}: {
  pull: PullRequestData;
  pendingDecision: PullRequestReviewDecision | null;
  onReview: PullRequestsSectionProps["onReview"];
}) {
  const messages = useMessages().pullRequestsSection;
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const pending = pendingDecision !== null;

  const review = async (decision: PullRequestReviewDecision) => {
    const sent = await onReview(
      pull,
      decision,
      decision === "REQUEST_CHANGES" ? comment.trim() : undefined,
    );
    if (sent) {
      setOpen(false);
      setComment("");
    }
  };

  return (
    <li className="space-y-3 rounded-2xl border border-border-soft bg-surface-card p-4">
      <div className="flex flex-wrap items-center gap-2 text-xs text-text-subtle">
        <span className="rounded-full bg-surface-2 px-2 py-0.5 font-medium text-text-strong">
          {pull.repository}
        </span>

        <span>#{pull.number}</span>

        {pull.updatedAtLabel && <span>{pull.updatedAtLabel}</span>}
      </div>

      <div className="flex items-start gap-3">
        {pull.authorAvatarUrl && (
          <img
            src={pull.authorAvatarUrl}
            alt=""
            className="h-8 w-8 shrink-0 rounded-full object-cover"
            loading="lazy"
          />
        )}

        <div className="min-w-0 flex-1">
          <a
            href={safeHref(pull.url) ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-text-strong hover:underline"
          >
            {pull.title}
          </a>

          {pull.authorLogin && (
            <p className="mt-0.5 text-xs text-text-subtle">{messages.by(pull.authorLogin)}</p>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button
          size="sm"
          className="rounded-full"
          disabled={pending}
          onClick={() => void review("APPROVE")}
        >
          {pendingDecision === "APPROVE" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}

          <>{messages.approve}</>
        </Button>

        <Button
          size="sm"
          variant="outline"
          className="rounded-full"
          disabled={pending}
          onClick={() => setOpen((value) => !value)}
        >
          <>{open ? messages.cancel : messages.requestChanges}</>
        </Button>

        <a
          href={safeHref(pull.url) ?? undefined}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium text-primary hover:underline"
        >
          {messages.openOnGithub}
        </a>
      </div>

      {open && (
        <div className="space-y-2 rounded-xl border border-border-soft bg-surface-1 p-3">
          <p className="text-xs font-medium uppercase tracking-wide text-text-subtle">
            {messages.commentLabel}
          </p>

          <Textarea
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            rows={3}
            maxLength={2000}
            placeholder={messages.commentPlaceholder}
          />

          <Button
            size="sm"
            className="rounded-full"
            disabled={pending || comment.trim().length < 5}
            onClick={() => void review("REQUEST_CHANGES")}
          >
            {pendingDecision === "REQUEST_CHANGES" ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : null}

            <>{messages.send}</>
          </Button>
        </div>
      )}
    </li>
  );
}
