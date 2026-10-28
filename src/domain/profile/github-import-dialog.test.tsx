// @vitest-environment node
import type { ReactNode } from "react";

import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import type { GithubImportDialogProps } from "../../types/domain/profile/github-import-dialog-props.js";

import { GithubImportDialog } from "./github-import-dialog.js";

// The Radix portal renders nothing on the server: the dialog parts become plain wrappers here.
vi.mock("../../ui/dialog.js", () => {
  const Plain = ({ children }: { children?: ReactNode }) => <div>{children}</div>;
  return { Dialog: Plain, DialogContent: Plain, DialogHeader: Plain, DialogTitle: Plain };
});

const noop = () => undefined;

const render = (patch: Partial<GithubImportDialogProps>) =>
  renderToStaticMarkup(
    <GithubImportDialog
      open
      onOpenChange={noop}
      notLinked={false}
      securityHref="/seguranca"
      repos={{
        loading: false,
        error: false,
        rows: [
          {
            name: "connect",
            fullName: "ana/connect",
            description: null,
            language: "TypeScript",
            stars: 3,
            forks: 1,
            fork: true,
            archived: false,
            updatedAtLabel: "20 out. 2026",
            url: "https://github.com/ana/connect",
          },
        ],
      }}
      selected={[]}
      onToggle={noop}
      onSelectAll={noop}
      onClear={noop}
      importing={false}
      onImport={noop}
      readme={{ loading: false, missing: false, data: null, error: false }}
      usingReadme={false}
      onUseReadme={noop}
      renderHtmlFrame={({ html }) => <i>{html}</i>}
      {...patch}
    />,
  );

describe("GithubImportDialog", () => {
  it("sem vínculo só aponta para a segurança", () => {
    const html = render({ notLinked: true });
    expect(html).toContain('href="/seguranca"');
    expect(html).not.toContain("Seus repositórios");
  });

  it("lista os repositórios e conta a seleção no botão", () => {
    const html = render({ selected: ["ana/connect"] });
    expect(html).toContain("connect");
    expect(html).toContain(">fork<");
    expect(html).toContain("20 out. 2026");
    expect(html).toContain("Importar 1 projeto");
  });

  it("sem repositórios ou com erro mostra o aviso", () => {
    expect(render({ repos: { loading: false, error: false, rows: [] } })).toContain(
      "Nenhum repositório público encontrado.",
    );
    expect(render({ repos: { loading: false, error: true, rows: [] } })).toContain(
      "Não foi possível importar agora.",
    );
  });

  it("README: ausente, carregado no quadro ou com erro", () => {
    expect(
      render({ readme: { loading: false, missing: true, data: null, error: false } }),
    ).toContain("ainda não tem um README público");
    const loaded = render({
      readme: {
        loading: false,
        missing: false,
        data: { html: "oi-readme", repoUrl: "https://github.com/ana/ana" },
        error: false,
      },
    });
    expect(loaded).toContain("<i>oi-readme</i>");
    expect(loaded).toContain("Usar como bio");
    expect(
      render({ readme: { loading: false, missing: false, data: null, error: true } }),
    ).toContain("Não foi possível ler o README agora.");
  });
});
