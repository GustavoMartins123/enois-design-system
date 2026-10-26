export type BlockUserDialogProps = {
  name: string;
  /** Já bloqueado: o botão vira "Desbloquear". */
  blocked: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** "Cancelar": fecha sem limpar o erro. */
  onCancel: () => void;
  pending?: boolean;
  error?: boolean;
  onConfirm: () => void;
};
