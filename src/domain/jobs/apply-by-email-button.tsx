import { Mail } from "lucide-react";

import { useMessages } from "../../messages/messages-context.js";
import type { ApplyByEmailButtonProps } from "../../types/domain/jobs/apply-by-email-button-props.js";
import { Button } from "../../ui/button.js";

/**
 * "Agilizar envio": o app escreve o e-mail de candidatura e abre o app de e-mail da pessoa.
 *
 * O botão só existe quando há um endereço: sem ele, não há o que agilizar (o app decide).
 */
export function ApplyByEmailButton({ busy, onClick }: ApplyByEmailButtonProps) {
  const messages = useMessages().applyByEmailButton;

  return (
    <Button
      variant="outline"
      className="rounded-full gap-2"
      disabled={busy}
      title={messages.hint}
      onClick={onClick}
    >
      <Mail className="h-4 w-4" />

      <>{messages.action}</>
    </Button>
  );
}
