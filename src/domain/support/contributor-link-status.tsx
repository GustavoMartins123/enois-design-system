import { Loader2, RefreshCw } from "lucide-react";

import { useMessages } from "../../messages/messages-context.js";
import type { ContributorLinkStatusProps } from "../../types/domain/support/contributor-link-status-props.js";
import { AppLink } from "../../ui/app-link.js";
import { Button } from "../../ui/button.js";
import { GithubIcon } from "../../ui/github-icon.js";

/**
 * GitHub linked, but no verified contribution yet. Shows the state and lets the person check
 * again. The app renders it only while authenticated, linked and not yet verified.
 */
export function ContributorLinkStatus({
  login,
  syncState,
  syncPending,
  syncResult,
  syncError,
  onSync,
  securityHref,
}: ContributorLinkStatusProps) {
  const messages = useMessages().contributorLinkStatus;
  const checked = (syncResult?.contributions ?? 0) + (syncResult?.issues ?? 0);

  return (
    <section className="surface-card space-y-3 p-5">
      <div className="flex items-center gap-2">
        <GithubIcon className="h-4 w-4 text-primary" aria-hidden />

        <h2 className="text-base font-semibold tracking-tight">{messages.title}</h2>
      </div>

      <p className="text-sm leading-relaxed text-muted-foreground">{messages.description(login)}</p>

      <div className="flex flex-wrap items-center gap-3">
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

        <AppLink href={securityHref} className="text-xs font-medium text-primary hover:underline">
          {messages.settingsLink}
        </AppLink>
      </div>

      {syncState === "ERROR" && <p className="text-xs text-destructive">{messages.error}</p>}

      {syncResult && (
        <p
          className={syncResult.rateLimited ? "text-xs text-amber-600" : "text-xs text-text-subtle"}
        >
          {syncResult.rateLimited
            ? messages.syncFailed
            : checked > 0
              ? messages.syncFound(syncResult.contributions, syncResult.issues)
              : messages.syncEmpty}
        </p>
      )}

      {syncError && <p className="text-xs text-destructive">{messages.syncFailed}</p>}
    </section>
  );
}
