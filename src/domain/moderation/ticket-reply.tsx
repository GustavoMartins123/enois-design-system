import { useState } from "react";

import { useMessages } from "../../messages/messages-context.js";
import type { TicketReplyProps } from "../../types/domain/moderation/ticket-reply-props.js";
import { Button } from "../../ui/button.js";
import { Textarea } from "../../ui/textarea.js";

/** Resposta do painel ao solicitante de um ticket, enviada por e-mail. */
export function TicketReply({ pending, onSubmit }: TicketReplyProps) {
  const messages = useMessages().ticketReply;
  const [message, setMessage] = useState("");

  const submit = async () => {
    if (await onSubmit(message.trim())) setMessage("");
  };

  return (
    <div className="space-y-2 rounded-xl border border-border-soft bg-surface-1 p-3">
      <p className="text-xs font-medium uppercase tracking-wide text-text-subtle">
        {messages.title}
      </p>

      <Textarea
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        rows={3}
        maxLength={4000}
        placeholder={messages.placeholder}
      />

      <Button
        size="sm"
        className="rounded-full"
        disabled={pending || message.trim().length < 5}
        onClick={() => void submit()}
      >
        {pending ? messages.sending : messages.action}
      </Button>
    </div>
  );
}
