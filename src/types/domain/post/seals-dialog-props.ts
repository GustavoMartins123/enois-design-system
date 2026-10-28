import type { PostSealCount } from "./post-seal-count.js";
import type { ReactionUserData } from "./reaction-user-data.js";
import type { SealPersonData } from "./seal-person-data.js";

export type SealsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  people: SealPersonData[];
  summary: PostSealCount[];
  /** Perfis por id (chegam depois da lista). */
  users?: Record<string, ReactionUserData>;
  isLoading: boolean;
  isError: boolean;
};
