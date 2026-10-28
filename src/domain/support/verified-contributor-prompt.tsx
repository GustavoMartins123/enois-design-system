import { useState } from "react";

import { Award, ChevronDown } from "lucide-react";

import { cn } from "../../lib/utils.js";
import { useMessages } from "../../messages/messages-context.js";
import type { VerifiedContributorPromptProps } from "../../types/domain/support/verified-contributor-prompt-props.js";
import { Button } from "../../ui/button.js";

/**
 * Invites people with a verified contribution to confirm their data for the contributors panel.
 * The form is the landing one in verified mode (GitHub already approved it, no manual review).
 * Collapsed by default; once confirmed, shows the confirmed card so the missing invite does not
 * look like a failure.
 */
export function VerifiedContributorPrompt({ confirmed, form }: VerifiedContributorPromptProps) {
  const messages = useMessages().verifiedContributorPrompt;
  const [open, setOpen] = useState(false);

  if (confirmed) {
    return (
      <section className="surface-card flex items-start gap-3 p-5">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary-soft text-primary">
          <Award className="h-5 w-5" aria-hidden />
        </span>

        <div className="min-w-0 space-y-1">
          <h2 className="text-base font-semibold tracking-tight">{messages.confirmedTitle}</h2>

          <p className="text-sm leading-relaxed text-muted-foreground">
            {messages.confirmedDescription}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="surface-card space-y-3 p-5">
      <div className="flex items-start gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary-soft text-primary">
          <Award className="h-5 w-5" aria-hidden />
        </span>

        <div className="min-w-0 space-y-1">
          <h2 className="text-base font-semibold tracking-tight">{messages.title}</h2>

          <p className="text-sm leading-relaxed text-muted-foreground">{messages.description}</p>
        </div>
      </div>

      <Button
        variant={open ? "outline" : "default"}
        className="rounded-full gap-1.5"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
      >
        {open ? messages.close : messages.action}

        <ChevronDown
          className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
          aria-hidden
        />
      </Button>

      {open && (
        <div className="space-y-3 border-t border-border-soft pt-4">
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-text-strong">{messages.formTitle}</h3>

            <p className="text-xs text-text-subtle">{messages.formHint}</p>
          </div>

          {form}
        </div>
      )}
    </section>
  );
}
