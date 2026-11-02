export type CommunityMarkProps = {
  /** Community name: its initials fill the mark. The mark is decorative; show the name beside it. */
  name: string;
  /** The community's own color. */
  color?: string | null;
  /** Without a color, a stable table color is picked from this (the community id). */
  seed?: string;
  size?: "xs" | "sm" | "md";
  className?: string;
};
