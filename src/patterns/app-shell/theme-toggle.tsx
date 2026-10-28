import { Moon, Sun } from "lucide-react";

import { useMessages } from "../../messages/messages-context.js";
import type { ThemeToggleProps } from "../../types/patterns/theme-toggle-props.js";

/** Light/dark switch. The app stores the theme and applies it to the DOM. */
export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const messages = useMessages().themeToggle;
  const Icon = theme === "light" ? Sun : Moon;
  const label = theme === "light" ? messages.light : messages.dark;

  return (
    <button
      type="button"
      onClick={onToggle}
      className="grid h-10 w-10 place-items-center rounded-full text-text-subtle transition hover:bg-surface-2 hover:text-primary"
      aria-label={label}
      title={label}
    >
      <Icon className="h-5 w-5 transition-transform duration-300 ease-out" />
    </button>
  );
}
