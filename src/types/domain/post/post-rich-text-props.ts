import type { RichTextProps } from "./rich-text-props.js";

/** Rich text as a post view asks the app to render it (the app adds mentions and inline media). */
export type PostRichTextProps = Omit<RichTextProps, "mentionHref" | "renderMedia">;
