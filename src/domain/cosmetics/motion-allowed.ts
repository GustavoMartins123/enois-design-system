/**
 * Whether decorative motion may play: never in lite mode (`html[data-lite]`), and not under
 * `prefers-reduced-motion` unless the app forces motion (`html[data-force-motion]`), the same
 * switches styles.css honors.
 */
export function motionAllowed(): boolean {
  if (typeof window === "undefined") return false;
  const root = document.documentElement;
  if (root.hasAttribute("data-lite")) return false;
  if (root.hasAttribute("data-force-motion")) return true;
  return !window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}
