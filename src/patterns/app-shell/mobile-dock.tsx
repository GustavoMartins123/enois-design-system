import { cn } from "../../lib/utils.js";
import { useMessages } from "../../messages/messages-context.js";
import type { MobileDockItem } from "../../types/patterns/mobile-dock-item.js";
import type { MobileDockProps } from "../../types/patterns/mobile-dock-props.js";
import { AppLink } from "../../ui/app-link.js";
import { Signal } from "../../ui/signal.js";

function DockLink({ item }: { item: MobileDockItem }) {
  const Icon = item.icon;

  return (
    <AppLink
      href={item.href}
      aria-current={item.active ? "page" : undefined}
      className={cn(
        "flex min-w-0 flex-col items-center gap-0.5 py-1 text-[11.5px] font-bold transition",
        item.active ? "text-text-strong" : "text-text-date hover:text-text-strong",
      )}
    >
      <span
        className={cn(
          "relative grid h-8 w-[3.25rem] place-items-center rounded-full transition",
          item.active && "bg-primary-soft text-primary",
        )}
      >
        <Icon className="h-6 w-6" />
        {item.signal && (
          <Signal
            signal={item.signal.kind === "today" ? { kind: "new" } : item.signal}
            onIcon
            className={cn(
              "absolute",
              item.signal.kind === "new" || item.signal.kind === "today"
                ? "right-3 top-0.5"
                : "-top-1.5 right-0.5",
            )}
          />
        )}
      </span>

      <span className="max-w-full truncate">{item.label}</span>
    </AppLink>
  );
}

/**
 * The phone's main navigation: a floating rounded dock above the home indicator, with the daily
 * destinations a thumb away and the publish action in the middle. Hidden from `lg` up, where the
 * side rail takes over.
 */
export function MobileDock({ items, action }: MobileDockProps) {
  const messages = useMessages().mobileDock;
  const ActionIcon = action.icon;
  const left = items.slice(0, 2);
  const right = items.slice(2, 4);

  return (
    <nav
      aria-label={messages.label}
      className="fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 grid h-[4.25rem] grid-cols-5 items-center rounded-[1.625rem] bg-[color-mix(in_oklab,var(--color-surface-card)_92%,transparent)] px-1.5 shadow-[var(--shadow-float)] ring-1 ring-border-soft backdrop-blur-xl lg:hidden"
    >
      {left.map((item) => (
        <DockLink key={item.href} item={item} />
      ))}

      <button
        type="button"
        onClick={action.onClick}
        aria-label={action.label}
        title={action.label}
        className="grid h-[3.125rem] w-[3.125rem] place-items-center justify-self-center rounded-[1.125rem] bg-primary text-primary-foreground shadow-[0_10px_20px_-8px_color-mix(in_oklab,var(--color-primary)_70%,transparent)] transition active:scale-95"
      >
        <ActionIcon className="h-6 w-6" />
      </button>

      {right.map((item) => (
        <DockLink key={item.href} item={item} />
      ))}
    </nav>
  );
}
