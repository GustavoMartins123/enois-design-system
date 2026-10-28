// @vitest-environment jsdom
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import { PostCard } from "./post-card.js";

describe("cabeçalho do card de post", () => {
  it("preserva autor e controles com classes responsivas no post fixado", () => {
    const host = document.createElement("div");
    host.innerHTML = renderToStaticMarkup(
      <PostCard
        post={{
          id: "post-demo",
          type: "INSIGHT",
          content: "Publicação de demonstração.",
          authorName: "Perfil de demonstração com nome comprido",
          authorAvatar: null,
          community: { name: "Comunidade de demonstração", joined: true },
          tags: [],
          mediaIds: [],
        }}
        hrefs={{ author: "/perfil/demo", post: "/post/demo", community: "/comunidades/demo" }}
        timeLabel="agora"
        topicLabel="Música"
        pinned
        onTogglePin={vi.fn()}
        isOwner={false}
        mySeals={[]}
        onShowSeals={vi.fn()}
        renderRichText={({ content }) => <p>{content}</p>}
        renderMediaGrid={() => null}
      />,
    );
    const header = host.querySelector("article > header");
    expect(header).not.toBeNull();
    expect(header?.textContent).toContain("Fixado");
    expect(header?.querySelector('a[href="/perfil/demo"]')).not.toBeNull();
    expect(header?.querySelector('button[aria-label="Desafixar"]')).not.toBeNull();
    for (const name of ["min-w-0", "flex-col", "sm:flex-row", "sm:flex-wrap"]) {
      expect(header?.classList.contains(name), name).toBe(true);
    }
    const author = header?.firstElementChild;
    for (const name of ["min-w-0", "w-full", "sm:w-auto", "sm:flex-1"]) {
      expect(author?.classList.contains(name), name).toBe(true);
    }
    expect(header?.lastElementChild?.classList.contains("flex-wrap")).toBe(true);
  });
});
