import type { Meta, StoryObj } from "@storybook/react-vite";

import { SandboxedHtmlFrame } from "../../patterns/html-frame/sandboxed-html-frame.js";
import { MentionTextarea } from "../post/editor/mention-textarea.js";
import { RichText } from "../post/rich-text.js";

import { BlogEditorDialog } from "./blog-editor-dialog.js";
import { BlogPostEditor } from "./blog-post-editor.js";

const meta: Meta = {
  title: "Domain/Blog",
};

export default meta;

export const EditorDialog: StoryObj = {
  render: () => (
    <BlogEditorDialog
      open
      onOpenChange={() => {}}
      blog={{ title: "Diário da Ana", description: "Receitas e rabiscos.", themeHtml: "" }}
      onSave={() => {}}
      renderHtmlFrame={(props) => <SandboxedHtmlFrame {...props} theme="light" />}
    />
  ),
};

export const PostEditor: StoryObj = {
  render: () => (
    <BlogPostEditor
      backHref="/blogs"
      onSubmit={() => {}}
      renderMentionTextarea={(props) => (
        <MentionTextarea {...props} mentionResults={[]} onMentionQueryChange={() => {}} />
      )}
      renderRichText={(props) => <RichText {...props} mentionHref={(username) => `/${username}`} />}
      renderHtmlFrame={(props) => <SandboxedHtmlFrame {...props} theme="light" />}
    />
  ),
};
