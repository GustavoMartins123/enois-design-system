import { type FormEvent, useState } from "react";

import { useMessages } from "../../messages/messages-context.js";
import type { AgeGateProps } from "../../types/domain/account/age-gate-props.js";
import { Button } from "../../ui/button.js";
import { DateTextInput } from "../../ui/date-text-input.js";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog.js";
import { Input } from "../../ui/input.js";
import { Label } from "../../ui/label.js";

/**
 * Política de idade do ECA Digital, em um diálogo só.
 *
 * - Sem data de nascimento: pede a data (a conta é regularizada na hora).
 * - Menor sem responsável: pede o e-mail do responsável e envia o convite; a conta continua
 *   bloqueada para escrever até um adulto aceitar (o backend é quem decide).
 *
 * The app decides when it opens and runs the requests; the form fields and their client-side
 * checks live here.
 */
export function AgeGate({
  open,
  onClose,
  mode,
  minDate,
  maxDate,
  inviteSentTo,
  error,
  declaring,
  inviting,
  checking,
  onSubmitDate,
  onSubmitInvite,
  onCheckAgain,
}: AgeGateProps) {
  const messages = useMessages().ageGate;
  const [birthDate, setBirthDate] = useState("");
  const [guardianEmail, setGuardianEmail] = useState("");
  const [clientError, setClientError] = useState<string | null>(null);
  const shownError = clientError ?? error;

  const submitDate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setClientError(null);
    // O campo entrega ISO quando a data esta completa; no meio da digitacao vem o texto parcial,
    // entao a data pela metade e barrada por esta regex (e nao tratada como "vazia").
    if (!/^\d{4}-\d{2}-\d{2}$/.test(birthDate)) {
      setClientError(messages.invalid);
      return;
    }
    onSubmitDate(birthDate);
  };

  const submitInvite = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setClientError(null);
    if (!guardianEmail.includes("@")) {
      setClientError(messages.parental.invalidEmail);
      return;
    }
    onSubmitInvite(guardianEmail.trim());
  };

  const isParental = mode === "parental";

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) onClose();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isParental ? messages.parental.title : messages.title}</DialogTitle>

          <DialogDescription>
            {isParental ? messages.parental.description : messages.description}
          </DialogDescription>
        </DialogHeader>

        {isParental ? (
          inviteSentTo ? (
            <div className="space-y-4">
              <p className="rounded-xl bg-primary-soft px-4 py-3 text-sm text-primary">
                {messages.parental.sentFor(inviteSentTo)}
              </p>

              <p className="text-sm text-text-subtle">{messages.parental.waiting}</p>

              <div className="flex flex-wrap justify-end gap-2">
                <Button type="button" variant="ghost" onClick={onClose}>
                  {messages.parental.later}
                </Button>

                <Button
                  type="button"
                  disabled={checking}
                  onClick={() => {
                    setClientError(null);
                    onCheckAgain();
                  }}
                >
                  {checking ? messages.parental.checking : messages.parental.checkAgain}
                </Button>
              </div>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={submitInvite}>
              <p className="text-sm text-text-subtle">{messages.parental.howItWorks}</p>

              <div className="space-y-2">
                <Label htmlFor="guardian-email">{messages.parental.emailLabel}</Label>

                <Input
                  id="guardian-email"
                  type="email"
                  required
                  maxLength={255}
                  value={guardianEmail}
                  onChange={(event) => setGuardianEmail(event.target.value)}
                />
              </div>

              {shownError && <p className="text-sm text-destructive">{shownError}</p>}

              <div className="flex flex-wrap justify-end gap-2">
                <Button type="button" variant="ghost" onClick={onClose}>
                  {messages.parental.later}
                </Button>

                <Button type="submit" disabled={inviting}>
                  {inviting ? messages.parental.inviting : messages.parental.invite}
                </Button>
              </div>
            </form>
          )
        ) : (
          <form className="space-y-4" onSubmit={submitDate}>
            <div className="space-y-2">
              <Label htmlFor="birth-date-gate-input">{messages.label}</Label>

              <DateTextInput
                id="birth-date-gate-input"
                required
                autoComplete="bday"
                min={minDate}
                max={maxDate}
                value={birthDate}
                onValueChange={setBirthDate}
              />
            </div>

            {shownError && <p className="text-sm text-destructive">{shownError}</p>}

            <div className="flex flex-wrap justify-end gap-2">
              <Button type="button" variant="ghost" onClick={onClose}>
                {messages.later}
              </Button>

              <Button type="submit" disabled={declaring}>
                {messages.confirm}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
