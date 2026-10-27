import { Award, Link2, Link2Off, Loader2, RefreshCw } from "lucide-react";

import { useMessages } from "../../messages/messages-context.js";
import type { GitHubLinkCardProps } from "../../types/domain/security/github-link-card-props.js";
import { AppLink } from "../../ui/app-link.js";
import { Button } from "../../ui/button.js";
import { GithubIcon } from "../../ui/github-icon.js";

/**
 * Vínculo GitHub usado pelos selos de contribuição. É separado do login social: vincular não
 * altera a forma de entrar nem a verificação de identidade da conta.
 */
export function GitHubLinkCard({
  status,
  loading = false,
  onLink,
  linkPending = false,
  onUnlink,
  unlinkPending = false,
  onSync,
  syncPending = false,
  syncResult = null,
  syncError = false,
  notConfigured = false,
  error = null,
  criteriaHref,
}: GitHubLinkCardProps) {
  const messages = useMessages().gitHubLinkCard;

  const checkedContributions = (syncResult?.contributions ?? 0) + (syncResult?.issues ?? 0);

  return (
    <section className="surface-card space-y-3 p-4">
      <div className="flex items-center gap-2">
        <Award className="h-4 w-4 text-primary" />

        <h2 className="text-base font-medium">{messages.title}</h2>
      </div>

      <p className="text-sm text-muted-foreground">{messages.description}</p>

      {loading ? (
        <div className="flex items-center gap-2 text-sm text-text-subtle">
          <Loader2 className="h-4 w-4 animate-spin" />
        </div>
      ) : status?.linked ? (
        <div className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border-soft px-3 py-2">
            <span className="inline-flex items-center gap-1.5 text-sm text-text-strong">
              <GithubIcon className="h-4 w-4" />
              {messages.linkedAs(status.login ?? "")}
            </span>

            <Button
              variant="outline"
              size="sm"
              className="rounded-full gap-1.5"
              disabled={unlinkPending}
              onClick={() => {
                if (window.confirm(messages.unlinkConfirm)) onUnlink();
              }}
            >
              {unlinkPending ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Link2Off className="h-3.5 w-3.5" />
              )}

              <>{messages.unlink}</>
            </Button>
          </div>

          <p
            className={
              status.syncState === "ERROR" ? "text-xs text-destructive" : "text-xs text-text-subtle"
            }
          >
            {!status.lastSyncLabel
              ? messages.neverSynced
              : status.syncState === "ERROR"
                ? messages.syncError
                : status.syncState === "STALE"
                  ? messages.syncStale
                  : messages.lastSync(status.lastSyncLabel)}
          </p>

          <Button
            size="sm"
            variant="outline"
            className="rounded-full gap-1.5"
            disabled={syncPending}
            onClick={onSync}
          >
            {syncPending ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <RefreshCw className="h-3.5 w-3.5" />
            )}

            <>{syncPending ? messages.syncing : messages.syncNow}</>
          </Button>

          {syncResult && (
            <p
              className={
                syncResult.rateLimited ? "text-xs text-amber-600" : "text-xs text-text-subtle"
              }
            >
              {syncResult.rateLimited
                ? messages.syncFailed
                : checkedContributions > 0
                  ? messages.syncFound(syncResult.contributions, syncResult.issues)
                  : messages.syncEmpty}
            </p>
          )}

          {syncError && <p className="text-xs text-destructive">{messages.syncFailed}</p>}
        </div>
      ) : (
        <Button size="sm" className="rounded-full gap-1.5" disabled={linkPending} onClick={onLink}>
          {linkPending ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Link2 className="h-3.5 w-3.5" />
          )}

          <>{linkPending ? messages.linking : messages.link}</>
        </Button>
      )}

      {notConfigured && <p className="text-xs text-amber-600">{messages.notConfigured}</p>}

      {error && !notConfigured && (
        <p className="text-xs text-destructive">
          {error === "unlink" ? messages.unlinkError : messages.error}
        </p>
      )}

      <AppLink
        href={criteriaHref}
        className="inline-block text-xs font-medium text-primary hover:underline"
      >
        {messages.criteria}
      </AppLink>
    </section>
  );
}
