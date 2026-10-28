import type { GameUpdateValues } from "./game-update-values.js";

export type GameUpdateDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Versão atual do jogo: semeia o campo a cada abertura. */
  initialVersion?: string | null;
  pending?: boolean;
  onSubmit: (values: GameUpdateValues) => void;
};
