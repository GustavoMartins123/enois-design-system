import type { ReactNode } from "react";

import type { MentionTextareaProps } from "../post/mention-textarea-props.js";
import type { PostRichTextProps } from "../post/post-rich-text-props.js";
import type { ProfileHtmlFrameProps } from "../profile/profile-html-frame-props.js";

import type { BlogPostEditorData } from "./blog-post-editor-data.js";
import type { BlogPostEditorValues } from "./blog-post-editor-values.js";

export type BlogPostEditorProps = {
  /** Com `post` é edição (preenche e salva por cima); sem ele publica um post novo. */
  post?: BlogPostEditorData | null;
  /** Endereço da lista de blogs (voltar e cancelar). */
  backHref: string;
  pending?: boolean;
  error?: string | null;
  onSubmit: (values: BlogPostEditorValues) => void;
  /** Campo de escrita com @menção (a busca de quem mencionar é do app). */
  renderMentionTextarea: (
    props: Omit<MentionTextareaProps, "mentionResults" | "onMentionQueryChange">,
  ) => ReactNode;
  /** Prévia do texto com a formatação leve (menções e mídias são do app). */
  renderRichText: (props: PostRichTextProps) => ReactNode;
  /** Desenha a pré-visualização do HTML no quadro isolado do app. */
  renderHtmlFrame: (props: ProfileHtmlFrameProps) => ReactNode;
};
