import type { ProfileLookPair } from "../../lib/theme/profile-look-pair.js";

export type ProfileLookDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** O que está gravado hoje (as duas vitrines). */
  value: ProfileLookPair;
  /** Salvar: recebe as duas vitrines editadas; fechar é decisão de quem chama. */
  onSave: (next: ProfileLookPair) => void;
  saving?: boolean;
};
