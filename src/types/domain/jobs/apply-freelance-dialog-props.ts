export type ApplyFreelanceDialogProps = {
  freelance: { title: string; username: string | null };
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pending: boolean;
  /** Erro do envio, já em texto de tela. */
  error: string | null;
  /** A mensagem foi enviada: o diálogo troca o campo pelo atalho para a conversa. */
  sent: boolean;
  /** Recebe a mensagem já aparada. */
  onSend: (message: string) => void;
  onOpenChat: () => void;
};
