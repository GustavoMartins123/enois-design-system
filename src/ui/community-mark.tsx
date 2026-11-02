import { cn } from "../lib/utils.js";
import type { CommunityMarkProps } from "../types/components/ui/community-mark-props.js";

const SIZES = {
  xs: "h-6 w-6 text-[10px]",
  sm: "h-8 w-8 text-xs",
  md: "h-11 w-11 text-sm",
} as const;

function initials(name: string) {
  const words = name
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 2 || /^[A-Z]/.test(word));
  const picked = (words.length > 1 ? [words[0], words[1]] : [name]).map((word) => word[0]);
  return picked.join("").toUpperCase().slice(0, 2);
}

/**
 * A community is a "table": a squircle in the community's color. People are circles, so the
 * shape alone tells a person from a place.
 */
export function CommunityMark({ name, color, size = "sm", className }: CommunityMarkProps) {
  return (
    <span
      role="img"
      aria-label={name}
      className={cn(
        "inline-grid shrink-0 place-items-center rounded-[34%] font-extrabold text-white",
        SIZES[size],
        className,
      )}
      style={{ background: color || "var(--color-primary)" }}
    >
      {initials(name)}
    </span>
  );
}
