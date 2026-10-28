// @vitest-environment node
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import type { GithubContributionData } from "../../types/domain/moderation/github-contribution-data.js";

import { ContributionsSection } from "./contributions-section.js";

const noop = () => {};

const base: GithubContributionData = {
  id: "g1",
  kind: "PULL_REQUEST",
  title: "Corrige o login",
  url: "https://github.com/rede-enois/frontend/pull/12",
  repository: "rede-enois/frontend",
  number: 12,
  username: null,
  githubLogin: "bia",
  status: "PENDING",
  happenedAtLabel: null,
  hasTests: true,
  changedFiles: 4,
  additions: 10,
  deletions: 2,
  score: 8,
  labels: '["bug","frontend"]',
  reverted: false,
  reviewNote: null,
};

function render(contribution: GithubContributionData, actionErrorMessage?: string) {
  return renderToStaticMarkup(
    <ContributionsSection
      filter="ALL"
      onFilterChange={noop}
      kind="ALL"
      onKindChange={noop}
      loading={false}
      loadError={false}
      onRefresh={noop}
      contributions={[contribution]}
      onReview={noop}
      onSync={noop}
      report={null}
      repositories={[]}
      onToggleRepository={noop}
      actionError
      actionErrorMessage={actionErrorMessage}
    />,
  );
}

describe("ContributionsSection", () => {
  it("shows PR details, parsed labels and the unlinked account", () => {
    const html = render(base);
    expect(html).toContain("Testes: sim");
    expect(html).toContain("4 arquivos");
    expect(html).toContain("Labels: bug, frontend");
    expect(html).toContain("GitHub sem vínculo com uma conta Énóis");
    expect(html).toContain("Integrado em: —");
  });

  it("hides PR details on issues and keeps non-JSON labels as they came", () => {
    const html = render({ ...base, kind: "ISSUE", labels: "good first issue" });
    expect(html).not.toContain("arquivos");
    expect(html).toContain("Fechada em");
    expect(html).toContain("Labels: good first issue");
  });

  it("prefers the API error message over the generic one", () => {
    expect(render(base, "Sem permissão.")).toContain("Sem permissão.");
    expect(render(base)).toContain("Não foi possível concluir a revisão.");
  });
});
