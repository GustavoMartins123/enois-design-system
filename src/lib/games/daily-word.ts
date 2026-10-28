import type { TileState } from "../../types/domain/games/tile-state.js";
import type { WordMark } from "../../types/domain/games/word-mark.js";
import type { WordState } from "../../types/domain/games/word-state.js";

// ─── Constantes ────────────────────────────────────────────────────────────────

export const MAX_GUESSES = 6;
export const WORD_LENGTH = 5;

export const KEYBOARD_ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "⌫"],
];

// Mapeamento físico de teclado → letra (normaliza acentos para a versão sem acento)
export const PHYSICAL_KEYS: Record<string, string> = {
  Enter: "ENTER",
  Backspace: "⌫",
};
for (const row of KEYBOARD_ROWS) {
  for (const key of row) {
    if (key !== "ENTER" && key !== "⌫") PHYSICAL_KEYS[key] = key;
  }
}

// ─── Helpers de cor ─────────────────────────────────────────────────────────────

/**
 * Tile responsiva: usa CSS custom property --tile-size calculada no wrapper da grade.
 * O tamanho flui entre ~48 px (320 px viewport) e 62 px (desktop).
 */
export function tileClasses(state: TileState, revealed: boolean): string {
  // w/h via inline style no wrapper; aqui usamos w-full aspect-square para preencher
  const base =
    "relative flex aspect-square w-full items-center justify-center rounded font-bold uppercase select-none border-2 transition-colors text-[clamp(1rem,4vw,1.375rem)] touch-manipulation";

  if (!revealed) {
    if (state === "typing")
      return `${base} border-foreground/60 bg-transparent text-foreground scale-105 transition-transform`;
    return `${base} border-border/40 bg-transparent text-foreground`;
  }

  switch (state) {
    case "CORRECT":
      return `${base} border-transparent bg-[#21a35d] text-white`;
    case "PRESENT":
      return `${base} border-transparent bg-[#c8a227] text-white`;
    case "ABSENT":
      return `${base} border-transparent bg-muted text-muted-foreground`;
    default:
      return `${base} border-border/40 bg-transparent text-foreground`;
  }
}

/** Retorna as classes do botão de teclado virtual conforme o melhor mark da letra. */
export function keyClasses(mark: WordMark | undefined, isAction: boolean): string {
  // Altura fluida; teclas de ação (ENTER/⌫) são proporcionalmente mais largas via flex
  const base = [
    "flex items-center justify-center rounded",
    "text-[clamp(0.65rem,2.5vw,0.875rem)] font-semibold uppercase",
    "h-[clamp(2.5rem,8vw,3.5rem)]",
    isAction ? "flex-[1.5]" : "flex-1",
    "min-w-0 cursor-pointer select-none",
    "transition-colors duration-300 active:scale-95 touch-manipulation",
  ].join(" ");
  switch (mark) {
    case "CORRECT":
      return `${base} bg-[#21a35d] text-white`;
    case "PRESENT":
      return `${base} bg-[#c8a227] text-white`;
    case "ABSENT":
      return `${base} bg-muted text-muted-foreground`;
    default:
      return `${base} bg-muted/60 text-foreground hover:bg-muted`;
  }
}

// ─── Derivar estado do teclado a partir dos palpites confirmados ────────────────

export function buildKeyMap(guesses: WordState["guesses"]): Record<string, WordMark> {
  const priority: Record<WordMark, number> = { CORRECT: 2, PRESENT: 1, ABSENT: 0 };
  const map: Record<string, WordMark> = {};
  for (const { word, marks } of guesses) {
    for (let i = 0; i < word.length; i++) {
      const letter = word[i];
      const mark = marks[i];
      if (!map[letter] || priority[mark] > priority[map[letter]]) {
        map[letter] = mark;
      }
    }
  }
  return map;
}
