import type { ReactNode } from "react";

import type { PostTypeOption } from "./post-type-option.js";
import type { PostType } from "./post-type.js";

export type PostEditDialogProps = {
  postId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  typeOptions: PostTypeOption[];
  editType: PostType;
  onTypeChange: (type: PostType) => void;
  /** Texto do post (o campo de escrita com menção vem do app). */
  draft: string;
  contentField: ReactNode;
  pageDraft: string;
  onPageDraftChange: (value: string) => void;
  pageMaxLength: number;
  /** Corpo do artigo (o campo vem do app). */
  bodyDraft: string;
  bodyField: ReactNode;
  /** A página/corpo ainda está chegando. */
  pageLoading?: boolean;
  pending?: boolean;
  onSave: () => void;
};
