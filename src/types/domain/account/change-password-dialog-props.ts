import type { ChangePasswordValues } from "./change-password-values.js";

export type ChangePasswordDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Ainda descobrindo se a conta tem senha. */
  loading?: boolean;
  /** Sem senha (entrou por login social): o diálogo cria a primeira em vez de trocar. */
  hasPassword: boolean;
  /** Chamado já validado (tamanho mínimo e confirmação conferem). */
  onSubmit: (values: ChangePasswordValues) => void;
  pending?: boolean;
  error?: string | null;
  /** O diálogo foi fechado: o app limpa o erro e o envio. */
  onReset?: () => void;
};
