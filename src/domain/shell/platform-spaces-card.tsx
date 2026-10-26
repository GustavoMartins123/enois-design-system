import { ArrowUpRight } from "lucide-react";

import { useMessages } from "../../messages/messages-context.js";
import type { PlatformSpacesCardProps } from "../../types/domain/shell/platform-spaces-card-props.js";
import { AppLink } from "../../ui/app-link.js";

/** Atalhos dos espaços novos no painel lateral (feed). */
export function PlatformSpacesCard({ spaces }: PlatformSpacesCardProps) {
  const messages = useMessages().platformSpacesCard;

  return (
    <div className="rounded-2xl border border-border-soft bg-surface-card p-4">
      <h2 className="text-sm font-medium text-text-strong">{messages.title}</h2>

      <p className="mt-0.5 text-xs text-text-subtle">{messages.subtitle}</p>

      <ul className="mt-3 space-y-1">
        {spaces.map((space) => (
          <li key={space.href}>
            <AppLink
              href={space.href}
              className="flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-sm font-normal text-text-strong transition hover:bg-muted hover:text-primary"
            >
              <span className="truncate">{space.label}</span>

              <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-text-subtle" />
            </AppLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
