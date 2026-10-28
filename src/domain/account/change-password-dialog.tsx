import { useState } from "react";

import { Loader2 } from "lucide-react";

import { useMessages } from "../../messages/messages-context.js";
import type { ChangePasswordDialogProps } from "../../types/domain/account/change-password-dialog-props.js";
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
import { PasswordInput } from "../../ui/password-input.js";

const MIN_LENGTH = 8;

/**
 * Troca de senha — e, para quem entrou por login social, a CRIAÇÃO da primeira.
 *
 * Quem veio do Google/LinkedIn nunca definiu senha: a conta nasce com um hash aleatório que
 * ninguém conhece. Para essas contas o diálogo não pede a senha atual (não existe), e sim cria a
 * primeira — sem isso a pessoa ficava presa: o segundo fator manda "defina uma senha" e a troca
 * pedia uma senha que nunca existiu.
 */
export function ChangePasswordDialog({
  open,
  onOpenChange,
  loading = false,
  hasPassword,
  onSubmit,
  pending = false,
  error: submitError = null,
  onReset,
}: ChangePasswordDialogProps) {
  const messages = useMessages().changePasswordDialog;
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reset = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setError(null);
    onReset?.();
  };

  const submit = () => {
    if (newPassword.length < MIN_LENGTH) {
      setError(messages.tooShort);
      return;
    }
    if (newPassword !== confirmPassword) {
      setError(messages.mismatch);
      return;
    }
    setError(null);
    onSubmit({ currentPassword: hasPassword ? currentPassword : "", newPassword });
  };

  const shownError = error ?? submitError;

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
          <DialogTitle className="text-lg font-normal text-text-strong">
            {hasPassword ? messages.title : messages.titleCreate}
          </DialogTitle>

          <DialogDescription>
            {hasPassword ? messages.description : messages.descriptionCreate}
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex justify-center py-6 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
          </div>
        ) : (
          <div className="space-y-4">
            {hasPassword && (
              <div className="space-y-1.5">
                <Label htmlFor="currentPassword">{messages.current}</Label>

                <Input
                  id="currentPassword"
                  type={showPasswords ? "text" : "password"}
                  autoComplete="current-password"
                  value={currentPassword}
                  onChange={(event) => setCurrentPassword(event.target.value)}
                  maxLength={128}
                />
              </div>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="newPassword">{messages.newPassword}</Label>

              <PasswordInput
                id="newPassword"
                revealed={showPasswords}
                onToggle={() => setShowPasswords((value) => !value)}
                autoComplete="new-password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                maxLength={128}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="confirmPassword">{messages.confirm}</Label>

              <Input
                id="confirmPassword"
                type={showPasswords ? "text" : "password"}
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                maxLength={128}
              />
            </div>

            {shownError && (
              <p className="rounded-xl bg-destructive/10 px-4 py-2 text-sm text-destructive">
                {shownError}
              </p>
            )}

            <Button
              className="w-full rounded-full"
              disabled={
                pending || !newPassword || !confirmPassword || (hasPassword && !currentPassword)
              }
              onClick={submit}
            >
              {pending ? messages.saving : hasPassword ? messages.action : messages.actionCreate}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
