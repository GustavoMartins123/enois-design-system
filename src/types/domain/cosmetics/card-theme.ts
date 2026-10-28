/** Colors that paint the profile card, Discord style: two background stops and an accent. */
export type CardTheme = {
  top: string;
  bottom: string;
  accent: string;
  fg: string;
  muted: string;
  surface: string;
  /** Dark cards only: the accent becomes the app primary, with dark ink on it. */
  primary?: { color: string; foreground: string };
};
