import type { SealEvidenceItem } from "./seal-evidence-item.js";

export type SealEvidenceListProps = {
  /** Total de evidências do selo; zero ou menos não desenha a lista. */
  total: number;
  /** A lista aberta: o app só busca as páginas enquanto ela estiver aberta. */
  open: boolean;
  onOpenChange: (open: boolean) => void;
  loading: boolean;
  error: boolean;
  items: SealEvidenceItem[];
  hasMore: boolean;
  loadingMore: boolean;
  onLoadMore: () => void;
};
