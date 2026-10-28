import type { LucideIcon } from "lucide-react";

import type { PostType } from "./post-type.js";

/** A post type the author can pick (label and icon come from the app catalog). */
export type PostTypeOption = {
  id: PostType;
  label: string;
  icon: LucideIcon;
};
