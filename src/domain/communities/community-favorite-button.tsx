import { Star } from "lucide-react";

import { cn } from "../../lib/utils.js";
import { useMessages } from "../../messages/messages-context.js";
import type { CommunityFavoriteButtonProps } from "../../types/domain/communities/community-favorite-button-props.js";

/** Estrela para favoritar/desfavoritar uma comunidade (bookmark, não exige participar). */
export function CommunityFavoriteButton({
  isFavorite,
  pending,
  onToggle,
  className,
}: CommunityFavoriteButtonProps) {
  const messages = useMessages().communityFavoriteButton;
  const label = isFavorite ? messages.unfavorite : messages.favorite;

  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={isFavorite}
      disabled={pending}
      // O card inteiro é um Link: sem isso o clique navegaria junto com o favoritar.
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onToggle();
      }}
      className={cn(
        "grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border-soft bg-surface-card/85 backdrop-blur transition hover:bg-surface-2 disabled:opacity-60",
        className,
      )}
    >
      <Star
        className={cn("h-4 w-4", isFavorite ? "fill-primary text-primary" : "text-text-subtle")}
      />
    </button>
  );
}
