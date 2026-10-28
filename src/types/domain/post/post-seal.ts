import type { LucideIcon } from "lucide-react";

import type { PostSealLabelKey } from "./post-seal-label-key.js";

/** A post seal: the backend id, its label key in `postSeals`, icon and colors. */
export type PostSeal = {
  id: string;
  labelKey: PostSealLabelKey;
  icon: LucideIcon;
  className: string;
};
