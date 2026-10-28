import type { Meta, StoryObj } from "@storybook/react-vite";

import { SandboxedHtmlFrame } from "./sandboxed-html-frame.js";

const meta: Meta = {
  title: "Patterns/HtmlFrame",
};

export default meta;

const html =
  '<h2>Minha página</h2><p style="background:var(--background);color:var(--foreground)">Texto que acompanha o tema do app.</p>';

export const Default: StoryObj = {
  render: () => (
    <div className="max-w-md">
      <SandboxedHtmlFrame html={html} title="Página publicada no post" theme="light" />
    </div>
  ),
};

export const Window: StoryObj = {
  render: () => (
    <div className="h-64 max-w-md">
      <SandboxedHtmlFrame
        html={html}
        title="Página publicada no post"
        theme="dark"
        className="h-full"
        innerPadding={false}
        autoHeight={false}
      />
    </div>
  ),
};
