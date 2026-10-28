import type { BlogPostFormat } from "./blog-post-format.js";

/** O post sendo editado (ausente = post novo). */
export type BlogPostEditorData = {
  title: string;
  body: string;
  bodyFormat: BlogPostFormat;
};
