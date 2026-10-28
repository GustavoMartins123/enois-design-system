import { useState } from "react";

import { useMessages } from "../../messages/messages-context.js";
import type { ChangeEmailDialogProps } from "../../types/domain/account/change-email-dialog-props.js";
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

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ChangeEmailDialog({
  open,
  onOpenChange,
  currentEmail,
  onSubmit,
  pending = false,
  error: submitError = null,
  done = false,
  onReset,
}: ChangeEmailDialogProps) {
  const messages = useMessages().changeEmailDialog;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const reset = () => {
    setEmail("");
    setPassword("");
    setError(null);
    onReset?.();
  };

  const normalized = email.trim().toLowerCase();
  const invalidEmail = normalized !== "" && !EMAIL_PATTERN.test(normalized);
  const sameEmail = normalized === currentEmail.trim().toLowerCase();
  const canSubmit = normalized !== "" && !invalidEmail && !sameEmail && password !== "";

  const submit = () => {
    setError(null);
    if (invalidEmail) return setError(messages.invalidEmail);
    if (sameEmail) return setError(messages.sameEmail);
    onSubmit({ email, password });
  };

  const shownError = error ?? submitError;

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) reset();
        onOpenChange(nextOpen);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-normal">{messages.title}</DialogTitle>

          <DialogDescription>{messages.description}</DialogDescription>
        </DialogHeader>

        {done ? (
          <div className="space-y-4 pt-2">
            <p className="text-sm text-muted-foreground">{messages.success}</p>

            <Button className="w-full rounded-full" onClick={() => onOpenChange(false)}>
              {messages.close}
            </Button>
          </div>
        ) : (
          <div className="space-y-4 pt-2">
            <p className="text-xs text-muted-foreground">{messages.current(currentEmail)}</p>

            <div className="space-y-1.5">
              <Label className="text-xs font-normal text-text-subtle">{messages.newEmail}</Label>

              <Input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={messages.newEmailPlaceholder}
                className="bg-muted"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-normal text-text-subtle">{messages.password}</Label>

              <Input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-muted"
              />

              <p className="text-xs text-muted-foreground">{messages.passwordHint}</p>
            </div>

            {shownError && (
              <p className="text-sm text-destructive" role="alert">
                {shownError}
              </p>
            )}

            <Button
              className="w-full rounded-full"
              disabled={!canSubmit || pending}
              onClick={submit}
            >
              {pending ? messages.saving : messages.action}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
