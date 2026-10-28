// @vitest-environment node
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { ContributorLinkStatus } from "./contributor-link-status.js";
import { VerifiedContributorPrompt } from "./verified-contributor-prompt.js";

function linkStatus(props: Partial<Parameters<typeof ContributorLinkStatus>[0]> = {}) {
  return renderToStaticMarkup(
    <ContributorLinkStatus
      login="ana"
      syncPending={false}
      syncError={false}
      onSync={() => {}}
      securityHref="/seguranca"
      {...props}
    />,
  );
}

describe("ContributorLinkStatus", () => {
  it("shows the login and the settings link", () => {
    const html = linkStatus();
    expect(html).toContain("Vinculado como @ana.");
    expect(html).toContain('href="/seguranca"');
    expect(html).not.toContain("Verificação concluída");
  });

  it("summarizes the check result", () => {
    expect(
      linkStatus({ syncResult: { contributions: 2, issues: 1, rateLimited: false } }),
    ).toContain("Verificação concluída: 2 pull requests e 1 issue.");
    expect(
      linkStatus({ syncResult: { contributions: 0, issues: 0, rateLimited: false } }),
    ).toContain("Nenhuma contribuição encontrada ainda.");
    expect(
      linkStatus({ syncResult: { contributions: 0, issues: 0, rateLimited: true } }),
    ).toContain("text-amber-600");
  });

  it("shows the last sync failure and the pending label", () => {
    expect(linkStatus({ syncState: "ERROR" })).toContain("A última verificação falhou");
    expect(linkStatus({ syncPending: true })).toContain("Verificando contribuições...");
  });
});

describe("VerifiedContributorPrompt", () => {
  it("starts collapsed, without the form", () => {
    const html = renderToStaticMarkup(
      <VerifiedContributorPrompt confirmed={false} form={<p>FORM</p>} />,
    );
    expect(html).toContain("Preencher formulário");
    expect(html).toContain('aria-expanded="false"');
    expect(html).not.toContain("FORM");
  });

  it("shows the confirmed card once confirmed", () => {
    const html = renderToStaticMarkup(<VerifiedContributorPrompt confirmed />);
    expect(html).toContain("Seus dados de contribuinte já estão confirmados");
    expect(html).not.toContain("Preencher formulário");
  });
});
