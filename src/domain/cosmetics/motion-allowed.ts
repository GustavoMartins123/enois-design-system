/**
 * Whether the person left the profile card's 3D tilt on: the app sets `html[data-no-tilt]` when
 * they turn it off in the personalization options.
 */
export function tiltAllowed(): boolean {
  return typeof document !== "undefined" && !document.documentElement.hasAttribute("data-no-tilt");
}

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
