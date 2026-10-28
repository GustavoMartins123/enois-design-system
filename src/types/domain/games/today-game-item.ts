/** Um jogo do card "Jogados hoje": as pessoas distintas nas últimas 24 horas e o link da página. */
export type TodayGameItem = {
  id: string;
  title: string;
  cover?: string | null;
  icon?: string | null;
  url?: string | null;
  players: number;
  href: string;
};
