import { Loader2, ShieldOff, Undo2 } from "lucide-react";

import { useMessages } from "../../messages/messages-context.js";
import type { BlockUserDialogProps } from "../../types/domain/account/block-user-dialog-props.js";
import { Button } from "../../ui/button.js";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog.js";

/**
 * Bloquear esconde a pessoa de tudo (feed, comentários, notificações, busca) e vale para sempre —
 * por isso a confirmação explica o que acontece antes de aplicar.
 */
export function BlockUserDialog({
  name,
  blocked,
  open,
  onOpenChange,
  onCancel,
  pending = false,
  error = false,
  onConfirm,
}: BlockUserDialogProps) {
  const messages = useMessages().blockUserDialog;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="rounded-full gap-1.5 text-destructive hover:text-destructive"
        >
          {blocked ? <Undo2 className="h-4 w-4" /> : <ShieldOff className="h-4 w-4" />}

          <>{blocked ? messages.unblockUser : messages.blockUser}</>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-normal">
            {blocked ? messages.unblockTitle(name) : messages.blockTitle(name)}
          </DialogTitle>

          <DialogDescription>
            {blocked ? messages.unblockDescription : messages.blockDescription}
          </DialogDescription>
        </DialogHeader>

        {error && (
          <p className="text-sm text-destructive" role="alert">
            {messages.blockError}
          </p>
        )}

        <DialogFooter className="gap-2">
          <Button variant="ghost" className="rounded-full" onClick={onCancel} disabled={pending}>
            {messages.cancel}
          </Button>

          <Button
            className="rounded-full gap-2"
            variant={blocked ? "outline" : "destructive"}
            disabled={pending}
            onClick={onConfirm}
          >
            {pending && <Loader2 className="h-4 w-4 animate-spin" />}

            {blocked ? messages.unblockUser : messages.blockUser}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
