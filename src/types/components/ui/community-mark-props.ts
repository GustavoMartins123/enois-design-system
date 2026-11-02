export type CommunityMarkProps = {
  /** Community name: its initials fill the mark and it is the accessible label. */
  name: string;
  /** The community's own color; falls back to the primary color. */
  color?: string | null;
  size?: "xs" | "sm" | "md";
  className?: string;
};
