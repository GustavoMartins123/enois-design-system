import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import type { ProfileProject } from "../../types/domain/profile/profile-project.js";

import { ProfileProjectsSection } from "./profile-projects-section.js";

const project = (patch: Partial<ProfileProject> = {}): ProfileProject => ({
  id: "pr1",
  title: "Rede",
  description: "A rede social",
  stack: [],
  repoUrl: null,
  status: null,
  diary: [],
  html: null,
  ...patch,
});

const render = (projects: ProfileProject[]) =>
  renderToStaticMarkup(
    <ProfileProjectsSection
      projects={projects}
      isOwner={false}
      onManage={() => {}}
      renderHtmlFrame={() => null}
    />,
  );

describe("ProfileProjectsSection", () => {
  it("desenha banner e ícone do projeto quando existem", () => {
    const html = render([
      project({
        banner: "https://cdn.example.com/banner.png",
        icon: "https://cdn.example.com/icon.png",
      }),
    ]);

    expect(html).toContain('src="https://cdn.example.com/banner.png"');
    expect(html).toContain('src="https://cdn.example.com/icon.png"');
  });

  it("sem banner nem ícone, só o card de texto", () => {
    const html = render([project()]);

    expect(html).not.toContain("<img");
    expect(html).toContain("Rede");
  });

  it("não desenha imagem de link com esquema perigoso", () => {
    const html = render([project({ banner: "javascript:alert(1)", icon: "data:image/png,x" })]);

    expect(html).not.toContain("<img");
  });
});
