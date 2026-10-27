// @vitest-environment node
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import type { GitHubLinkCardProps } from "../../types/domain/security/github-link-card-props.js";

import { GitHubLinkCard } from "./github-link-card.js";

const render = (props: Partial<GitHubLinkCardProps>) =>
  renderToStaticMarkup(
    <GitHubLinkCard
      onLink={() => {}}
      onUnlink={() => {}}
      onSync={() => {}}
      criteriaHref="/selos"
      {...props}
    />,
  );

const linked = { linked: true, login: "ana", lastSyncLabel: "27/10/2026" };

describe("GitHubLinkCard", () => {
  it("sem vínculo mostra o botão de vincular", () => {
    expect(render({ status: { linked: false } })).toContain("Vincular GitHub");
  });

  it("estado da sincronização: nunca, erro, desatualizado e data", () => {
    expect(render({ status: { ...linked, lastSyncLabel: null } })).toContain(
      "Ainda não sincronizou",
    );
    expect(render({ status: { ...linked, syncState: "ERROR" } })).toContain(
      "A última sincronização falhou",
    );
    expect(render({ status: { ...linked, syncState: "STALE" } })).toContain(
      "podem estar desatualizados",
    );
    expect(render({ status: { ...linked, syncState: "OK" } })).toContain(
      "Última sincronização: 27/10/2026",
    );
  });

  it("resultado da verificação", () => {
    expect(
      render({ status: linked, syncResult: { contributions: 2, issues: 1, rateLimited: false } }),
    ).toContain("Verificação concluída: 2 pull requests e 1 issue.");
    expect(
      render({ status: linked, syncResult: { contributions: 0, issues: 0, rateLimited: false } }),
    ).toContain("Nenhuma contribuição encontrada");
    expect(
      render({ status: linked, syncResult: { contributions: 5, issues: 0, rateLimited: true } }),
    ).toContain("Não foi possível verificar agora");
  });

  it("não configurado esconde o erro genérico", () => {
    const html = render({ status: { linked: false }, notConfigured: true, error: "link" });
    expect(html).toContain("ainda não está configurado");
    expect(html).not.toContain("Não foi possível alterar");
    expect(render({ status: linked, error: "unlink" })).toContain(
      "Não foi possível desvincular o GitHub.",
    );
  });
});
