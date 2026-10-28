import type { Meta, StoryObj } from "@storybook/react-vite";

import { ThemeToggle } from "../../patterns/app-shell/theme-toggle.js";

import { LegalLastUpdated, LegalLayout, LegalSection } from "./legal-layout.js";

const meta: Meta = {
  title: "Domain/Legal",
};

export default meta;

export const Page: StoryObj = {
  render: () => (
    <LegalLayout
      year={2026}
      hrefs={{ home: "#", about: "#", terms: "#", privacy: "#", guidelines: "#" }}
      themeToggle={<ThemeToggle theme="light" onToggle={() => {}} />}
    >
      <h1 className="text-2xl font-semibold">Termos de Uso</h1>

      <LegalLastUpdated date="24 de outubro de 2026" />

      <LegalSection title="1. Aceitação dos termos">
        <p>Ao criar uma conta você concorda com estes termos.</p>
      </LegalSection>
    </LegalLayout>
  ),
};
