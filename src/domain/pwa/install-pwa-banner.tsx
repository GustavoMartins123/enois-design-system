import { Download, Share, X } from "lucide-react";

import { useMessages } from "../../messages/messages-context.js";
import type { InstallPwaBannerProps } from "../../types/domain/pwa/install-pwa-banner-props.js";
import { Button } from "../../ui/button.js";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog.js";

/**
 * Convite para instalar o app. The app decides when it shows (install prompt, iOS, engagement)
 * and what installing does; this draws the invite and the iOS "Add to Home Screen" steps.
 */
export function InstallPwaBanner({
  showBanner,
  onInstall,
  onClose,
  iosStepsOpen,
  onCloseIosSteps,
}: InstallPwaBannerProps) {
  const messages = useMessages().installPwaBanner;

  return (
    <>
      {showBanner && (
        <aside
          aria-label={messages.ariaLabel}
          className="fixed bottom-6 left-1/2 z-50 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 rounded-2xl border border-border-soft bg-surface-card p-3 shadow-lg animate-in fade-in-0 slide-in-from-bottom-8"
        >
          <div className="flex items-center gap-3">
            {/* Served by the app (public/icons). */}
            <img src="/icons/brand-icon-192.png" alt="" className="h-10 w-10 shrink-0 rounded-lg" />

            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-text-strong">{messages.title}</p>

              <p className="text-xs font-normal text-text-subtle">{messages.description}</p>
            </div>

            <Button size="sm" onClick={onInstall} aria-label={messages.ariaLabel}>
              <Download className="h-4 w-4" aria-hidden="true" />
              {messages.action}
            </Button>

            <button
              type="button"
              onClick={onClose}
              aria-label={messages.close}
              title={messages.close}
              className="flex shrink-0 items-center justify-center rounded-md p-1 text-text-subtle transition hover:text-text-strong"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </aside>
      )}

      <Dialog open={iosStepsOpen} onOpenChange={(open) => !open && onCloseIosSteps()}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>{messages.iosTitle}</DialogTitle>

            <DialogDescription>{messages.iosIntro}</DialogDescription>
          </DialogHeader>

          <ol className="list-decimal space-y-3 pl-5 text-sm font-normal text-text-subtle">
            <li>
              {messages.iosStepShareBefore}{" "}
              <strong className="text-text-strong">
                {messages.iosShare}
                <Share className="mx-1 inline h-4 w-4 align-middle" aria-hidden="true" />
              </strong>
              {messages.iosStepShareAfter}
            </li>

            <li>
              {messages.iosStepAddBefore}{" "}
              <strong className="text-text-strong">{messages.iosAddToHome}</strong>.
            </li>

            <li>
              {messages.iosStepConfirmBefore}{" "}
              <strong className="text-text-strong">{messages.iosAdd}</strong>{" "}
              {messages.iosStepConfirmAfter}
            </li>
          </ol>

          <Button onClick={onCloseIosSteps}>{messages.iosOk}</Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
