import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import type { LinkProps } from "../types/adapters/link-props.js";
import { AppLink } from "../ui/app-link.js";
import { PasswordInput } from "../ui/password-input.js";

import { EnoisProvider } from "./enois-provider.js";

describe("EnoisProvider", () => {
  it("renders the default pt-BR messages and a plain anchor without a provider", () => {
    const html = renderToStaticMarkup(
      <>
        <PasswordInput revealed={false} onToggle={() => {}} />

        <AppLink href="/feed">Feed</AppLink>
      </>,
    );

    expect(html).toContain('aria-label="Mostrar senha"');
    expect(html).toContain('<a href="/feed">Feed</a>');
  });

  it("applies message overrides and the app link adapter", () => {
    const RouterLink = ({ href, ...props }: LinkProps) => <a data-router href={href} {...props} />;
    const html = renderToStaticMarkup(
      <EnoisProvider messages={{ passwordInput: { show: "Show password" } }} Link={RouterLink}>
        <PasswordInput revealed={false} onToggle={() => {}} />

        <AppLink href="/feed">Feed</AppLink>
      </EnoisProvider>,
    );

    expect(html).toContain('aria-label="Show password"');
    expect(html).toContain("data-router");
  });
});
