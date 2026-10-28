import type { ChangeEmailValues } from "./change-email-values.js";

export type ChangeEmailDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentEmail: string;
  /** Chamado já validado (e-mail válido e diferente do atual). */
  onSubmit: (values: ChangeEmailValues) => void;
  pending?: boolean;
  /** Erro da troca no servidor, já traduzido pelo app. */
  error?: string | null;
  /** A troca foi pedida: o diálogo mostra a confirmação. */
  done?: boolean;
  /** O diálogo foi fechado por ele mesmo: o app limpa o resultado da troca. */
  onReset?: () => void;
};
