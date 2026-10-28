import { useState } from "react";

import { cn } from "../../../lib/utils.js";
import { useMessages } from "../../../messages/messages-context.js";
import type { SpoilerTextProps } from "../../../types/domain/post/spoiler-text-props.js";

/**
 * Trecho com spoiler: o texto fica ofuscado até a pessoa tocar para exibir.
 *
 * É a forma de esconder **só uma frase** no meio de um post — quem está num grupo de filmes conta a
 * cena sem estragar para quem ainda não viu, e quem quiser lê toca.
 *
 * Limite honesto: o texto está no documento (borrado, não ausente), então quem abrir o código-fonte
 * consegue ler. Isso vale para todo spoiler de rede social — aqui o objetivo é evitar o esbarrão,
 * não esconder de quem procura.
 */
export function SpoilerText({ text }: SpoilerTextProps) {
  const messages = useMessages().spoilerText;
  const [shown, setShown] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setShown((current) => !current)}
      aria-expanded={shown}
      title={shown ? messages.hide : messages.show}
      className={cn(
        "cursor-pointer rounded-md px-1 text-left transition",
        shown
          ? "bg-surface-2 text-text-strong"
          : "bg-text-strong/90 text-transparent blur-[5px] select-none hover:blur-[3px]",
      )}
    >
      {text}
    </button>
  );
}
