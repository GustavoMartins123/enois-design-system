export type HiddenSaciProps = {
  /** Hunt spot where this Saci hides (`feed`, `vagas`...). */
  spot: string;
  found?: boolean;
  pending?: boolean;
  onFound: (spot: string) => void;
  className?: string;
};
