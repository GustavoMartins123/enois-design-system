/** Colors that paint the profile card, Discord style: two background stops and an accent. */
export type CardTheme = {
  top: string;
  bottom: string;
  accent: string;
  fg: string;
  muted: string;
  surface: string;
  /**
   * App tokens that depend on the card tone (light or dark), set inline on the card so the app
   * content in its slots reads on the theme instead of the page (`--primary-text`, chips...).
   */
  tokens: Readonly<Record<string, string>>;
};
