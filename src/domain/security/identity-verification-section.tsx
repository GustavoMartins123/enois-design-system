import { BadgeCheck, Loader2, ShieldQuestion } from "lucide-react";

import { useMessages } from "../../messages/messages-context.js";
import type { IdentityVerificationSectionProps } from "../../types/domain/security/identity-verification-section-props.js";
import { Badge } from "../../ui/badge.js";
import { Button } from "../../ui/button.js";

/**
 * Verificação de identidade civil. O estado vem SEMPRE do backend; o botão só existe quando há um
 * provedor autorizado configurado — sem isso, mostramos indisponibilidade em vez de um botão morto.
 */
export function IdentityVerificationSection({
  status,
  loading = false,
  onStart,
  startPending = false,
  onRefresh,
  refreshPending = false,
  onRevoke,
  revokePending = false,
}: IdentityVerificationSectionProps) {
  const messages = useMessages().identityVerificationSection;

  const state = status?.state ?? "NOT_VERIFIED";
  const verified = status?.verified ?? false;

  return (
    <section className="surface-card p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <ShieldQuestion className="h-5 w-5 text-primary" />

          <h2 className="text-sm font-semibold">{messages.title}</h2>
        </div>

        {verified && (
          <Badge className="gap-1 rounded-full bg-growth/15 text-growth">
            <BadgeCheck className="h-3.5 w-3.5" />
            {messages.badgeLabel}
          </Badge>
        )}
      </div>

      <p className="mt-2 text-sm text-muted-foreground">{messages.subtitle}</p>

      <p className="mt-3 text-sm font-medium">{messages.states[state]}</p>

      {verified && status?.provider && (
        <p className="mt-1 text-xs text-muted-foreground">{messages.badgeHint}</p>
      )}

      <div className="mt-4 space-y-1 text-xs text-muted-foreground">
        <p>{messages.whatWeStore}</p>

        <p>{messages.whoProcesses}</p>
      </div>

      {!status?.providerAvailable && (
        <p className="mt-4 rounded-xl bg-surface-2 p-3 text-xs text-text-subtle">
          {messages.unavailable}
        </p>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {status?.providerAvailable && !verified && state !== "PENDING" && (
          <Button className="rounded-full" disabled={loading || startPending} onClick={onStart}>
            {startPending ? <Loader2 className="h-4 w-4 animate-spin" /> : messages.start}
          </Button>
        )}

        {state === "PENDING" && status?.providerAvailable && (
          <Button
            variant="outline"
            className="rounded-full"
            disabled={refreshPending}
            onClick={onRefresh}
          >
            {refreshPending ? <Loader2 className="h-4 w-4 animate-spin" /> : messages.refresh}
          </Button>
        )}

        {verified && (
          <Button
            variant="outline"
            className="rounded-full text-destructive"
            disabled={revokePending}
            onClick={onRevoke}
          >
            {messages.revoke}
          </Button>
        )}
      </div>
    </section>
  );
}
