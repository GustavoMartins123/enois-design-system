import { HeartPulse } from "lucide-react";

import { useMessages } from "../../messages/messages-context.js";
import type { HealthyUsageReminderProps } from "../../types/domain/wellbeing/healthy-usage-reminder-props.js";
import { Button } from "../../ui/button.js";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../ui/dialog.js";

/** O lembrete de pausa do uso saudável; o app conta o tempo da sessão e decide quando abrir. */
export function HealthyUsageReminder({ open, onDismiss, brandIconUrl }: HealthyUsageReminderProps) {
  const messages = useMessages().healthyUsageReminder;

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) onDismiss();
      }}
    >
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-normal">
            <HeartPulse className="h-5 w-5 text-primary" />

            <>{messages.title}</>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-1">
          <div className="flex items-center gap-3">
            <img
              src={brandIconUrl}
              alt={messages.brandName}
              className="h-16 w-16 shrink-0 rounded-2xl"
            />

            {/* Balão do Nois, ao lado da logo. */}
            <div className="relative flex-1 rounded-2xl rounded-bl-sm border border-border-soft bg-primary-soft px-3 py-2 text-sm text-primary-text">
              {messages.noise}
            </div>
          </div>

          <p className="text-sm text-text-strong">{messages.body}</p>

          <div className="flex justify-end">
            <Button className="rounded-full" onClick={onDismiss}>
              {messages.cta}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
