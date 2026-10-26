// @vitest-environment jsdom
import { act } from "react";

import { createRoot } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ConversationThread } from "./conversation-thread.js";

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

const container = document.createElement("div");
document.body.append(container);
const root = createRoot(container);

afterEach(() => act(() => root.render(null)));

function renderThread(onSend: () => Promise<void>) {
  act(() =>
    root.render(
      <ConversationThread
        profileHref="/perfil/ana"
        loading={false}
        empty
        newestMessageId={null}
        hasOlderMessages={false}
        loadingOlder={false}
        onLoadOlder={() => {}}
        selecting={false}
        selectedCount={0}
        onStartSelecting={() => {}}
        onCancelSelection={() => {}}
        deletePending={false}
        onDeleteSelected={() => {}}
        sendPending={false}
        onSend={onSend}
        servicesOpen={false}
        onServicesOpenChange={() => {}}
        servicesLoading={false}
        services={[]}
        serviceHref={(id) => `/servicos#oferta-${id}`}
      />,
    ),
  );
}

async function typeAndSend(value: string) {
  const textarea = container.querySelector("textarea")!;
  const setValue = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, "value")!.set!;
  act(() => {
    setValue.call(textarea, value);
    textarea.dispatchEvent(new Event("input", { bubbles: true }));
  });
  await act(async () => {
    container.querySelector("form")!.dispatchEvent(new Event("submit", { bubbles: true }));
  });
}

describe("ConversationThread", () => {
  it("envia o texto aparado e limpa o campo", async () => {
    const onSend = vi.fn(() => Promise.resolve());
    renderThread(onSend);

    await typeAndSend("  oi  ");

    expect(onSend).toHaveBeenCalledWith({ text: "oi", files: [], mediaSpoiler: false });
    expect(container.querySelector("textarea")!.value).toBe("");
  });

  it("mostra o erro da subida no compositor", async () => {
    renderThread(() => Promise.reject(new Error("Arquivo grande demais")));

    await typeAndSend("oi");

    expect(container.textContent).toContain("Arquivo grande demais");
  });
});
