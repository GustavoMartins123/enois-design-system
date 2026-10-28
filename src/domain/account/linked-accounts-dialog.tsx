import { Link2, Link2Off, Loader2 } from "lucide-react";

import { useMessages } from "../../messages/messages-context.js";
import type { LinkedAccountsDialogProps } from "../../types/domain/account/linked-accounts-dialog-props.js";
import { Button } from "../../ui/button.js";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog.js";
import { Switch } from "../../ui/switch.js";

/**
 * Contas vinculadas: mostra o que já está ligado e permite vincular/desvincular.
 *
 * Só oferece vincular os provedores habilitados (ver ENABLED_OAUTH_PROVIDERS), mas continua
 * listando um provedor desativado que a conta já tenha vinculado — senão ficaria impossível
 * desvincular. Vincular começa um OAuth com state de vinculação (o backend só liga a identidade
 * se o pedido tiver partido de uma conta logada). Desvincular é recusado quando seria o último
 * jeito de entrar.
 */
export function LinkedAccountsDialog({
  open,
  onOpenChange,
  loading = false,
  providers,
  busy = false,
  onLink,
  onUnlink,
  errorMessage,
  linkedinSync,
  syncPending = false,
  onSyncChange,
  reconnectPending = false,
  onReconnect,
  importSection,
}: LinkedAccountsDialogProps) {
  const messages = useMessages().linkedAccountsDialog;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-normal">{messages.title}</DialogTitle>

          <DialogDescription>{messages.description}</DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex justify-center py-6 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
          </div>
        ) : (
          <ul className="space-y-2 pt-2">
            {providers.map(({ provider, label, current, linkable }) => (
              <li
                key={provider}
                className="flex items-center justify-between gap-3 rounded-xl border border-border-soft px-3 py-2.5"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-text-strong">{label}</p>

                  <p className="truncate text-xs font-normal text-text-subtle">
                    {current ? current.email || messages.linked : messages.notLinked}
                  </p>
                </div>

                {current ? (
                  <Button
                    variant="outline"
                    size="sm"
                    className="shrink-0 rounded-full gap-1.5"
                    disabled={busy}
                    onClick={() => onUnlink(provider)}
                  >
                    <Link2Off className="h-3.5 w-3.5" />

                    <>{messages.unlink}</>
                  </Button>
                ) : (
                  linkable && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="shrink-0 rounded-full gap-1.5"
                      disabled={busy}
                      onClick={() => onLink(provider)}
                    >
                      <Link2 className="h-3.5 w-3.5" />

                      <>{messages.link(label)}</>
                    </Button>
                  )
                )}
              </li>
            ))}
          </ul>
        )}

        {errorMessage && (
          <p className="mt-2 rounded-xl bg-destructive/10 px-4 py-2 text-sm text-destructive">
            {errorMessage}
          </p>
        )}

        {linkedinSync && (
          <div className="mt-2 rounded-xl border border-border-soft px-3 py-3">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-medium text-text-strong">
                  {messages.linkedinSync.toggle}
                </p>

                <p className="text-xs font-normal text-text-subtle">
                  {messages.linkedinSync.toggleHint}
                </p>
              </div>

              <Switch
                checked={linkedinSync.postSync}
                disabled={syncPending || !linkedinSync.canPost}
                onCheckedChange={onSyncChange}
              />
            </div>

            {/* O share falha em silêncio de propósito; o resultado da última tentativa é o que
                deixa a pessoa diagnosticar sem suporte (relato: "ativei, publiquei e não foi"). */}
            {linkedinSync.lastShareStatus && (
              <p className="mt-2 text-xs font-normal text-text-subtle">
                {linkedinSync.lastShareStatus === "OK"
                  ? messages.linkedinSync.lastShareOk
                  : messages.linkedinSync.lastShareFailed(linkedinSync.lastShareStatus)}
                {linkedinSync.lastShareAtLabel ? linkedinSync.lastShareAtLabel : null}
              </p>
            )}

            {!linkedinSync.canPost && (
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <p className="text-xs font-normal text-text-subtle">
                  {linkedinSync.reason === "SERVER_KEY_MISSING"
                    ? messages.linkedinSync.serverKey
                    : messages.linkedinSync.notReady}
                </p>
                {linkedinSync.reason !== "SERVER_KEY_MISSING" && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-auto shrink-0 rounded-full"
                    disabled={reconnectPending}
                    onClick={onReconnect}
                  >
                    {messages.linkedinSync.reconnect}
                  </Button>
                )}
                {linkedinSync.reason !== "SERVER_KEY_MISSING" && (
                  <p className="mt-1 basis-full text-xs text-text-subtle">
                    {messages.linkedinSync.reconnectHint}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* A importação mora AQUI: conectou o LinkedIn, o próximo passo natural está na mesma tela.
            O import lê o ARQUIVO DE DADOS do LinkedIn (o mesmo caminho sancionado — sem scraping e
            sem depender da aprovação de parceiro): a pessoa escolhe o que quer trazer. */}
        <div className="mt-3">{importSection}</div>
      </DialogContent>
    </Dialog>
  );
}
