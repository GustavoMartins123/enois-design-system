import { useState } from "react";

import { useMessages } from "../../messages/messages-context.js";
import type { DeleteAccountDialogProps } from "../../types/domain/account/delete-account-dialog-props.js";
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

export function DeleteAccountDialog({
  open,
  onOpenChange,
  onSubmit,
  pending = false,
  error = null,
  onReset,
}: DeleteAccountDialogProps) {
  const messages = useMessages().deleteAccountDialog;
  const [password, setPassword] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const reset = () => {
    setPassword("");
    setConfirmed(false);
    onReset?.();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) reset();
        onOpenChange(next);
      }}
    >
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-normal text-destructive">
            {messages.title}
          </DialogTitle>

          <DialogDescription>{messages.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <ul className="list-disc space-y-1 pl-5 text-sm font-normal text-text-subtle">
            {messages.consequences.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="space-y-1.5">
            <Label htmlFor="deletePassword">{messages.password}</Label>

            <Input
              id="deletePassword"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              maxLength={128}
            />
          </div>

          <label className="flex items-start gap-2 text-sm font-normal text-text-strong">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(event) => setConfirmed(event.target.checked)}
              className="mt-0.5 h-4 w-4"
            />

            <>{messages.confirm}</>
          </label>

          {error && (
            <p className="rounded-xl bg-destructive/10 px-4 py-2 text-sm text-destructive">
              {error}
            </p>
          )}

          <Button
            variant="destructive"
            className="w-full rounded-full"
            disabled={pending || !password || !confirmed}
            onClick={() => onSubmit(password)}
          >
            {pending ? messages.deleting : messages.action}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
