export type RepostDialogProps = {
  postId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pending?: boolean;
  /** O viewer já republicou este post; mostra opção de desfazer. */
  reposted?: boolean;
  /** Republica direto (`undefined`) ou com a opinião. */
  onRepost: (opinion?: string) => void;
  /** Desfaz o repost puro. */
  onUndoRepost?: () => void;
};
