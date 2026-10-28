import { useEffect, useState } from "react";

import { Repeat2 } from "lucide-react";

import { useMessages } from "../../messages/messages-context.js";
import type { RepostDialogProps } from "../../types/domain/post/repost-dialog-props.js";
import { Button } from "../../ui/button.js";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog.js";
import { Textarea } from "../../ui/textarea.js";

/** Limite combinado com o backend (`RepostPostService`). */
export const REPOST_OPINION_MAX = 600;

/**
 * Republicar em duas portas: direto (cópia com o crédito) ou COM opinião — o comentário vira o
 * texto da publicação e o post original aparece citado embaixo, como um quote-repost.
 */
export function RepostDialog({
  postId,
  open,
  onOpenChange,
  pending = false,
  onRepost,
}: RepostDialogProps) {
  const messages = useMessages().repostDialog;
  const [opinion, setOpinion] = useState("");

  // O app fecha o diálogo quando a republicação dá certo: a opinião sai junto.
  useEffect(() => {
    if (!open) setOpinion("");
  }, [open]);

  const cleanOpinion = opinion.trim();

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) setOpinion("");
        onOpenChange(next);
      }}
    >
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-normal">
            <Repeat2 className="h-5 w-5 text-primary" />

            <>{messages.title}</>
          </DialogTitle>

          <DialogDescription className="text-sm leading-relaxed text-text-subtle">
            {messages.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-1.5">
          <label
            htmlFor={`repost-opinion-${postId}`}
            className="text-xs font-normal text-text-subtle"
          >
            {messages.opinionLabel}
          </label>

          <Textarea
            id={`repost-opinion-${postId}`}
            value={opinion}
            onChange={(event) => setOpinion(event.target.value)}
            placeholder={messages.opinionPlaceholder}
            rows={4}
            maxLength={REPOST_OPINION_MAX}
          />

          <p className="text-right text-xs text-text-subtle">
            {messages.opinionCount(opinion.length)}
          </p>
        </div>

        <div className="flex flex-col-reverse gap-2 pt-1 sm:flex-row sm:justify-end">
          <Button
            variant="outline"
            className="rounded-full"
            disabled={pending}
            onClick={() => onRepost(undefined)}
          >
            {messages.plain}
          </Button>

          <Button
            className="rounded-full"
            disabled={pending || cleanOpinion.length === 0}
            onClick={() => onRepost(cleanOpinion)}
          >
            {messages.withOpinion}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
