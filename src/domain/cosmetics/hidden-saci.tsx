import { cn } from "../../lib/utils.js";
import { useMessages } from "../../messages/messages-context.js";
import type { HiddenSaciProps } from "../../types/domain/cosmetics/hidden-saci-props.js";

import { COSMETIC_ICONS } from "./cosmetic-icons.js";

/**
 * The Saci hiding in a corner of the app during the hunt (`caca-saci`): a small red cap with
 * the pipe smoking. Clicking it reports the spot; once found it stays, dimmed, as a souvenir.
 */
export function HiddenSaci({
  spot,
  found = false,
  pending = false,
  onFound,
  className,
}: HiddenSaciProps) {
  const messages = useMessages().hiddenSaci;
  return (
    <button
      type="button"
      className={cn("cos-hidden-saci", found && "is-found", className)}
      aria-label={found ? messages.found : messages.label}
      title={found ? messages.found : undefined}
      disabled={found || pending}
      onClick={() => onFound(spot)}
      data-spot={spot}
    >
      <svg viewBox="-12 -14 24 26" aria-hidden>
        <g className="cos-anim cos-bob">
          <g transform="translate(-1 -3) scale(0.85)">{COSMETIC_ICONS.carapuca}</g>

          <g transform="translate(5 6) scale(0.5)">{COSMETIC_ICONS.cachimbo}</g>
        </g>
      </svg>
    </button>
  );
}
