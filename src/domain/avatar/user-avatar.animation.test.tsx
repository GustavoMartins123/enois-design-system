// @vitest-environment jsdom
import { act } from "react";

import { type Root, createRoot, hydrateRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ANIMATED_FRAMES, FX_FRAMES } from "./avatar-frames.js";
import { UserAvatar } from "./user-avatar.js";

describe("Animação das molduras do avatar", () => {
  let root: Root;
  let host: HTMLDivElement;
  let hidden = false;
  let callback: IntersectionObserverCallback;
  const observe = vi.fn();
  const unobserve = vi.fn();
  const disconnect = vi.fn();
  const createObserver = vi.fn(function (onChange: IntersectionObserverCallback) {
    callback = onChange;
    return { observe, unobserve, disconnect };
  });

  beforeEach(() => {
    vi.clearAllMocks();
    hidden = false;
    vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
    vi.stubGlobal("IntersectionObserver", createObserver);
    vi.spyOn(document, "hidden", "get").mockImplementation(() => hidden);
    host = document.createElement("div");
    document.body.append(host);
    root = createRoot(host);
  });

  afterEach(async () => {
    await act(async () => root.unmount());
    host.remove();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  function intersect(target: Element, isIntersecting: boolean) {
    callback([{ target, isIntersecting } as IntersectionObserverEntry], {} as IntersectionObserver);
  }

  it("hidrata as molduras antigas e novas com os mesmos desenhos e IDs do servidor", async () => {
    const avatars = (
      <>
        {FX_FRAMES.map((frame) => (
          <UserAvatar key={frame} frame={frame} fallback="EN" />
        ))}
      </>
    );
    await act(async () => root.unmount());
    host.innerHTML = renderToString(avatars);
    const errorLog = vi.spyOn(console, "error").mockImplementation(() => {});
    const recoverableError = vi.fn();
    await act(async () => {
      root = hydrateRoot(host, avatars, { onRecoverableError: recoverableError });
    });
    expect(recoverableError).not.toHaveBeenCalled();
    expect(errorLog).not.toHaveBeenCalled();
    expect(host.querySelectorAll(".moldura-fx")).toHaveLength(FX_FRAMES.length);
    const ids = [...host.querySelectorAll("[id]")].map((element) => element.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("não observa avatares sem animação", async () => {
    const addListener = vi.spyOn(document, "addEventListener");
    await act(async () =>
      root.render(
        <>
          <UserAvatar />
          <UserAvatar frame="moldura-ambar" />
        </>,
      ),
    );
    expect(createObserver).not.toHaveBeenCalled();
    expect(addListener.mock.calls.filter(([name]) => name === "visibilitychange")).toHaveLength(0);
    expect(host.querySelector("[data-avatar-animated]")).toBeNull();
  });

  it("compartilha um observer e um listener entre molduras SVG, elementos HTML e anéis CSS", async () => {
    const addListener = vi.spyOn(document, "addEventListener");
    await act(async () =>
      root.render(
        <>
          <UserAvatar frame="moldura-toxica" />
          <UserAvatar frame="moldura-orbita" />
          <UserAvatar frame="moldura-aurora" />
        </>,
      ),
    );
    expect(createObserver).toHaveBeenCalledTimes(1);
    expect(observe).toHaveBeenCalledTimes(3);
    expect(addListener.mock.calls.filter(([name]) => name === "visibilitychange")).toHaveLength(1);
    expect(host.querySelectorAll("[data-avatar-animated]")).toHaveLength(3);
    expect(host.querySelector("[data-avatar-animating]")).toBeNull();
  });

  it("não marca nem observa uma moldura FX que não seja animada", async () => {
    vi.spyOn(ANIMATED_FRAMES, "includes").mockReturnValue(false);
    await act(async () => root.render(<UserAvatar frame="moldura-orbita" />));
    expect(host.querySelector(".moldura-fx")).not.toBeNull();
    expect(host.querySelector("[data-avatar-animated]")).toBeNull();
    expect(createObserver).not.toHaveBeenCalled();
  });

  it("pausa fora da tela e na aba oculta e retoma apenas as molduras visíveis", async () => {
    await act(async () =>
      root.render(
        <>
          <UserAvatar frame="moldura-toxica" />
          <UserAvatar frame="moldura-pulsar" />
        </>,
      ),
    );
    const [first, second] = [...host.querySelectorAll("[data-avatar-animated]")];
    intersect(first, true);
    intersect(second, false);
    expect(first.hasAttribute("data-avatar-animating")).toBe(true);
    expect(second.hasAttribute("data-avatar-animating")).toBe(false);

    hidden = true;
    document.dispatchEvent(new Event("visibilitychange"));
    expect(first.hasAttribute("data-avatar-animating")).toBe(false);
    hidden = false;
    document.dispatchEvent(new Event("visibilitychange"));
    expect(first.hasAttribute("data-avatar-animating")).toBe(true);
    expect(second.hasAttribute("data-avatar-animating")).toBe(false);

    intersect(first, false);
    expect(first.hasAttribute("data-avatar-animating")).toBe(false);
  });

  it.each(ANIMATED_FRAMES)("%s: pausa fora da tela e na aba oculta", async (frame) => {
    await act(async () => root.render(<UserAvatar frame={frame} />));
    const avatar = host.querySelector("[data-avatar-animated]")!;
    expect(avatar).not.toBeNull();
    expect(avatar.hasAttribute("data-avatar-animating")).toBe(false);
    intersect(avatar, true);
    expect(avatar.hasAttribute("data-avatar-animating")).toBe(true);
    hidden = true;
    document.dispatchEvent(new Event("visibilitychange"));
    expect(avatar.hasAttribute("data-avatar-animating")).toBe(false);
    hidden = false;
    document.dispatchEvent(new Event("visibilitychange"));
    expect(avatar.hasAttribute("data-avatar-animating")).toBe(true);
    intersect(avatar, false);
    expect(avatar.hasAttribute("data-avatar-animating")).toBe(false);
  });

  it("compartilha o observer entre uma moldura antiga e as duas novas coleções", async () => {
    await act(async () =>
      root.render(
        <>
          <UserAvatar frame="moldura-tempestade" />
          <UserAvatar frame="moldura-mare" />
          <UserAvatar frame="moldura-radar" />
        </>,
      ),
    );
    expect(createObserver).toHaveBeenCalledTimes(1);
    expect(observe).toHaveBeenCalledTimes(3);
  });

  it("propaga a falha de observação e libera os recursos incompletos", async () => {
    const removeListener = vi.spyOn(document, "removeEventListener");
    observe.mockImplementationOnce(() => {
      throw new Error("Falha ao observar avatar");
    });
    const renderFailingFrame = async () => {
      await act(async () => root.render(<UserAvatar frame="moldura-neon" />));
    };
    await expect(renderFailingFrame()).rejects.toThrow("Falha ao observar avatar");
    expect(disconnect).toHaveBeenCalledTimes(1);
    expect(removeListener).toHaveBeenCalledWith("visibilitychange", expect.any(Function));
    await act(async () => root.render(<UserAvatar frame="moldura-mare" />));
    expect(createObserver).toHaveBeenCalledTimes(2);
    const avatar = host.querySelector("[data-avatar-animated]")!;
    intersect(avatar, true);
    expect(avatar.hasAttribute("data-avatar-animating")).toBe(true);
  });

  it("libera recursos ao desmontar e ignora callbacks atrasados", async () => {
    const removeListener = vi.spyOn(document, "removeEventListener");
    await act(async () => root.render(<UserAvatar frame="moldura-glacial" />));
    const avatar = host.querySelector("[data-avatar-animated]")!;
    intersect(avatar, true);
    await act(async () => root.render(null));
    expect(unobserve).toHaveBeenCalledWith(avatar);
    expect(disconnect).toHaveBeenCalledTimes(1);
    expect(removeListener).toHaveBeenCalledWith("visibilitychange", expect.any(Function));
    intersect(avatar, true);
    expect(avatar.hasAttribute("data-avatar-animating")).toBe(false);
  });

  it("acompanha a troca entre moldura com efeito, anel animado e moldura simples", async () => {
    await act(async () => root.render(<UserAvatar frame="moldura-orbita" />));
    const previous = host.querySelector("[data-avatar-animated]")!;
    intersect(previous, true);
    await act(async () => root.render(<UserAvatar frame="moldura-aurora" />));
    const next = host.querySelector("[data-avatar-animated]")!;
    expect(next).not.toBe(previous);
    expect(unobserve).toHaveBeenCalledWith(previous);
    expect(observe).toHaveBeenLastCalledWith(next);
    expect(next.hasAttribute("data-avatar-animating")).toBe(false);
    intersect(next, true);
    expect(next.hasAttribute("data-avatar-animating")).toBe(true);
    await act(async () => root.render(<UserAvatar frame="moldura-ambar" />));
    expect(host.querySelector("[data-avatar-animated]")).toBeNull();
    expect(host.querySelector("[data-avatar-animating]")).toBeNull();
  });

  it("marca uma única vez o nó do anel CSS e observa esse mesmo nó", async () => {
    await act(async () => root.render(<UserAvatar frame="moldura-aurora" />));
    const marked = host.querySelectorAll("[data-avatar-animated]");
    expect(marked).toHaveLength(1);
    expect(marked[0].getAttribute("data-avatar-frame")).toBe("moldura-aurora");
    expect(host.querySelector(".moldura-fx")).toBeNull();
    expect(observe).toHaveBeenCalledTimes(1);
    expect(observe).toHaveBeenCalledWith(marked[0]);
  });

  it("marca uma única vez o invólucro da moldura FX e observa o nó que contém o efeito", async () => {
    await act(async () => root.render(<UserAvatar frame="moldura-orbita" />));
    const marked = host.querySelectorAll("[data-avatar-animated]");
    expect(marked).toHaveLength(1);
    expect(marked[0].querySelector(".moldura-fx")).not.toBeNull();
    expect(observe).toHaveBeenCalledTimes(1);
    expect(observe).toHaveBeenCalledWith(marked[0]);
  });

  it("sem IntersectionObserver deixa a moldura estática sem observar nem quebrar", async () => {
    const addListener = vi.spyOn(document, "addEventListener");
    vi.stubGlobal("IntersectionObserver", undefined);
    await act(async () => root.render(<UserAvatar frame="moldura-inferno" />));
    expect(host.querySelector(".moldura-fx")).not.toBeNull();
    expect(host.querySelector("[data-avatar-animated]")).not.toBeNull();
    expect(host.querySelector("[data-avatar-animating]")).toBeNull();
    expect(addListener.mock.calls.filter(([name]) => name === "visibilitychange")).toHaveLength(0);
    expect(createObserver).not.toHaveBeenCalled();
    await act(async () => root.render(null));
    expect(host.querySelector("[data-avatar-frame]")).toBeNull();
  });
});
