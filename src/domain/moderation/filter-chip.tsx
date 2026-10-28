import { cn } from "../../lib/utils.js";

/** Chip de filtro das filas do painel. */
export function FilterChip({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1 text-xs font-medium transition",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border-soft text-text-subtle hover:border-primary/50 hover:text-primary",
      )}
    >
      {label}
    </button>
  );
}
