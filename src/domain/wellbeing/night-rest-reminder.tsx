import { Moon } from "lucide-react";

import { useMessages } from "../../messages/messages-context.js";
import type { NightRestReminderProps } from "../../types/domain/wellbeing/night-rest-reminder-props.js";
import { Button } from "../../ui/button.js";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog.js";

/** Late-night care popup on the feed; the app decides when it opens and records the dismissal. */
export function NightRestReminder({ open, onDismiss }: NightRestReminderProps) {
  const messages = useMessages().nightRestReminder;

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
            <Moon className="h-5 w-5 text-primary" />

            <>{messages.title}</>
          </DialogTitle>

          <DialogDescription className="text-sm leading-relaxed text-text-strong">
            {messages.body}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
          <Button variant="outline" className="rounded-full" onClick={onDismiss}>
            {messages.keep}
          </Button>

          <Button className="rounded-full" onClick={onDismiss}>
            {messages.rest}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
