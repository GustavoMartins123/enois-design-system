export type DeleteAccountDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Chamado com a senha depois que a pessoa confirmou a exclusão. */
  onSubmit: (password: string) => void;
  pending?: boolean;
  error?: string | null;
  /** O diálogo foi fechado: o app limpa o erro e o envio. */
  onReset?: () => void;
};
