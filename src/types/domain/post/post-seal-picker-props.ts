export type PostSealPickerProps = {
  /** Selos que quem lê já deu neste post. */
  mySeals: string[];
  /** Alterna um selo (o backend tira quando já existe). */
  onToggle: (sealId: string) => void;
  pending?: boolean;
  /** Tira todos os selos de quem lê. */
  onRemove: () => void;
};
