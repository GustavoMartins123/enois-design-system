export type OfficialBadgeProps = {
  /** Official badge id (`emblema-*`); unknown ids render nothing. */
  badge: string;
  className?: string;
  /** Accessible name; without it the badge is decorative, like the uploaded ones. */
  title?: string;
};
