import { useEffect, useState } from "react";

import { useMessages } from "../../messages/messages-context.js";
import type { GameUpdateDialogProps } from "../../types/domain/games/game-update-dialog-props.js";
import { Button } from "../../ui/button.js";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog.js";
import { Input } from "../../ui/input.js";
import { Label } from "../../ui/label.js";
import { Textarea } from "../../ui/textarea.js";

/**
 * "Novidades/atualizações": o criador conta o que mudou nesta versão e quem acompanha o criador
 * recebe o aviso. O backend já fazia isso; faltava a tela.
 */
export function GameUpdateDialog({
  open,
  onOpenChange,
  initialVersion,
  pending = false,
  onSubmit,
}: GameUpdateDialogProps) {
  const messages = useMessages().gameUpdateDialog;
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [version, setVersion] = useState("");

  useEffect(() => {
    if (!open) return;
    setTitle("");
    setBody("");
    setVersion(initialVersion ?? "");
  }, [open, initialVersion]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-normal">{messages.title}</DialogTitle>

          <DialogDescription>{messages.hint}</DialogDescription>
        </DialogHeader>

        <div className="space-y-3 pt-1">
          <div className="space-y-1.5">
            <Label className="text-xs font-normal text-text-subtle">{messages.updateTitle}</Label>

            <Input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder={messages.updateTitlePlaceholder}
              maxLength={200}
              className="bg-muted"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-normal text-text-subtle">{messages.updateBody}</Label>

            <Textarea
              value={body}
              onChange={(event) => setBody(event.target.value)}
              placeholder={messages.updateBodyPlaceholder}
              rows={4}
              maxLength={4000}
              className="bg-muted"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-normal text-text-subtle">{messages.updateVersion}</Label>

            <Input
              value={version}
              onChange={(event) => setVersion(event.target.value)}
              placeholder="1.2"
              maxLength={40}
              className="bg-muted"
            />
          </div>

          <Button
            className="w-full rounded-full"
            disabled={title.trim() === "" || pending}
            onClick={() => onSubmit({ title, body, version })}
          >
            {pending ? messages.publishing : messages.publish}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
