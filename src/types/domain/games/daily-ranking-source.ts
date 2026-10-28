/** O ranking do dia como o app o carregou: cada jogo escreve o placar das suas linhas. */
export type DailyRankingSource<T> = {
  loading: boolean;
  error: boolean;
  onRetry: () => void;
  items?: (T & { username: string; name: string; href: string })[];
};
