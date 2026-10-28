// @vitest-environment jsdom
import { act } from "react";

import { createRoot } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";

import { TicketReply } from "./ticket-reply.js";

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

const container = document.createElement("div");
document.body.append(container);
const root = createRoot(container);

afterEach(() => act(() => root.render(null)));

async function typeAndReply(onSubmit: (message: string) => Promise<boolean>, value: string) {
  act(() => root.render(<TicketReply onSubmit={onSubmit} />));
  const textarea = container.querySelector("textarea")!;
  const setValue = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, "value")!.set!;
  act(() => {
    setValue.call(textarea, value);
    textarea.dispatchEvent(new Event("input", { bubbles: true }));
  });
  await act(async () => {
    container.querySelector("button")!.click();
  });
  return textarea;
}

describe("TicketReply", () => {
  it("envia a resposta aparada e limpa o campo quando deu certo", async () => {
    const onSubmit = vi.fn(() => Promise.resolve(true));
    const textarea = await typeAndReply(onSubmit, "  Resolvido, obrigado.  ");
    expect(onSubmit).toHaveBeenCalledWith("Resolvido, obrigado.");
    expect(textarea.value).toBe("");
  });

  it("mantém o texto quando o envio falhou", async () => {
    const textarea = await typeAndReply(() => Promise.resolve(false), "Resolvido, obrigado.");
    expect(textarea.value).toBe("Resolvido, obrigado.");
  });

  it("não envia resposta com menos de 5 caracteres", async () => {
    const onSubmit = vi.fn(() => Promise.resolve(true));
    await typeAndReply(onSubmit, " oi ");
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
