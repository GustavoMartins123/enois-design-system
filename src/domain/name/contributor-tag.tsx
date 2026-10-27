import { cn } from "../../lib/utils.js";
import { useMessages } from "../../messages/messages-context.js";
import type { ContributorTagProps } from "../../types/domain/name/contributor-tag-props.js";

/** Pill "Contribuinte" com a cor escolhida no perfil; o mesmo desenho no perfil e no feed. */
export function ContributorTag({ color, className }: ContributorTagProps) {
  const messages = useMessages().contributorTag;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium",
        className,
      )}
      style={{
        color: color ?? "var(--primary)",
        borderColor: color ?? "var(--primary)",
      }}
    >
      {messages.label}
    </span>
  );
}
