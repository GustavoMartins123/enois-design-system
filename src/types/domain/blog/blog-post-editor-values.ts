import type { BlogPostFormat } from "./blog-post-format.js";

/** O post como a pessoa deixou: o app publica ou grava por cima. */
export type BlogPostEditorValues = {
  title: string;
  body: string;
  format: BlogPostFormat;
  notifySubscribers: boolean;
};
