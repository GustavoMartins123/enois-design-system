import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Login, nome, e-mail e login do GitHub são texto do usuário sem espaço: sem ponto de quebra a
 * palavra estoura a caixa e a página inteira passa a rolar de lado no celular. Item de flex
 * ainda nasce com `min-width: auto` (o min-content da palavra inteira) e não encolhe.
 *
 * Medido em 2026-10-27 (Chrome headless, 390px): a fila de notas e a de jogos estouravam 34px
 * com um login de 72 caracteres; o contato do painel de contribuintes, 40px com um e-mail real.
 * Este teste trava a quebra em cada lugar do painel de moderação que mostra esse texto.
 */
function classe(arquivo: string, padrao: RegExp): string {
  const achado = readFileSync(join(__dirname, arquivo), "utf8").match(padrao);
  if (!achado) throw new Error(`não achei o elemento em ${arquivo}`);
  return achado[1] ?? "";
}

describe("texto longo no painel de moderação", () => {
  it.each([
    ["notes-section.tsx", /<p className="([^"]*)"[^>]*>\s*\{note\.authorUsername/],
    ["games-review-section.tsx", /<p className="([^"]*)"[^>]*>\s*@\{g\.username/],
    ["projects-review-section.tsx", /<p className="([^"]*)"[^>]*>\s*@\{project\.username/],
  ])("%s quebra o login", (arquivo, padrao) => {
    expect(classe(arquivo, padrao)).toContain("break-words");
  });

  it("a lista de contas suspeitas quebra o login (e o item encolhe)", () => {
    const login = classe(
      "suspicious-users-section.tsx",
      /<span className="([^"]*)"[^>]*>\s*@\{item\.username\}/,
    );
    expect(login).toContain("break-words");
    expect(login).toContain("min-w-0");
  });

  it("o card de contribuinte quebra o nome do candidato", () => {
    const nome = classe(
      "contributor-card.tsx",
      /<p className="([^"]*)"[^>]*>\s*\{application\.name\}/,
    );
    expect(nome).toContain("break-words");
    expect(nome).toContain("min-w-0");
  });

  it.each([
    [
      "GitHub",
      /<a\s+href=\{`https:\/\/github\.com\/\$\{application\.github\}`\}[\s\S]*?className="([^"]*)"/,
    ],
    ["e-mail", /<a\s+href=\{`mailto:\$\{application\.email\}`\}[\s\S]*?className="([^"]*)"/],
  ])("o link de %s do contribuinte encolhe e quebra", (_, padrao) => {
    const link = classe("contributor-card.tsx", padrao);
    expect(link).toContain("min-w-0");
    expect(link).toContain("break-all");
  });

  it("os ícones do contato não são espremidos quando o texto quebra", () => {
    const fonte = readFileSync(join(__dirname, "contributor-card.tsx"), "utf8");
    const icones = fonte.match(/<(GithubIcon|Mail) className="([^"]*)"/g) ?? [];
    expect(icones).toHaveLength(2);
    for (const icone of icones) expect(icone).toContain("shrink-0");
  });
});
