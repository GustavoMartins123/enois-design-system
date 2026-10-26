export type RepostDialogProps = {
  postId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pending?: boolean;
  /** Republica direto (`undefined`) ou com a opinião. */
  onRepost: (opinion?: string) => void;
};
