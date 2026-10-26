import { useMessages } from "../../messages/messages-context.js";
import type { LinkedInSyncPromptProps } from "../../types/domain/account/linkedin-sync-prompt-props.js";
import { Button } from "../../ui/button.js";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog.js";

/**
 * Pergunta feita UMA vez, ao voltar do vínculo com o LinkedIn: quer publicar seus posts do Énóis
 * também no feed do LinkedIn? Se o servidor ainda não consegue publicar (sem chave de criptografia
 * ou token sem w_member_social), o diálogo explica em vez de oferecer um "Sim" que não funciona.
 */
export function LinkedInSyncPrompt({
  notReady,
  serverKeyMissing,
  pending = false,
  onClose,
  onAnswer,
}: LinkedInSyncPromptProps) {
  const messages = useMessages().linkedInSyncPrompt;
  const reason = serverKeyMissing ? messages.serverKey : messages.notReady;

  return (
    <Dialog open onOpenChange={(open) => (!open ? onClose() : undefined)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-normal">{messages.promptTitle}</DialogTitle>

          <DialogDescription>{notReady ? reason : messages.promptBody}</DialogDescription>
        </DialogHeader>

        <div className="flex flex-wrap justify-end gap-2 pt-2">
          {notReady ? (
            <Button className="rounded-full" onClick={onClose}>
              {messages.close}
            </Button>
          ) : (
            <>
              <Button variant="outline" className="rounded-full" onClick={() => onAnswer(false)}>
                {messages.no}
              </Button>

              <Button className="rounded-full" disabled={pending} onClick={() => onAnswer(true)}>
                {messages.yes}
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
