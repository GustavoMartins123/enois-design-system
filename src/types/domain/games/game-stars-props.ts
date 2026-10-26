export type GameStarsProps = {
  value: number;
  /** Ausente = só leitura. */
  onPick?: (rating: number) => void;
};
