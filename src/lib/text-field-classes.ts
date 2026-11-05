import { type ClassValue } from "clsx";

import { cn } from "./utils.js";

/** Keep compact text sizes on desktop without triggering focus zoom on iOS. */
export function textFieldClasses(...inputs: ClassValue[]) {
  return cn(
    ...inputs.map((input) => {
      const tokens = cn(input).split(/\s+/);
      const compact = tokens.find((token) => token === "text-xs" || token === "text-sm");
      if (!compact) return tokens.join(" ");
      return cn(
        compact === "text-xs" ? "text-base md:text-xs" : "text-base md:text-sm",
        tokens.filter((token) => token !== compact).join(" "),
      );
    }),
  );
}
