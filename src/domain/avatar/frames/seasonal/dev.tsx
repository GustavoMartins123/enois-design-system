import type { SeasonalFrameArt } from "../../../../types/domain/avatar/seasonal-frame-art.js";
import { polar, round } from "../../avatar-frames.js";

import { anim, arc, orbit, perch, pixelRing, ring, textRing } from "./frame-kit.js";

const TERMINAL_PROMPT = "~/enois $ git push origin main && echo deploy ·";

/** A headset with mic and the green "live" light. */
function fone() {
  return (
    <>
      <path
        d={arc(53, -72, 72)}
        stroke="#334155"
        strokeWidth={5}
        fill="none"
        strokeLinecap="round"
      />
      {[-80, 80].map((a) => {
        const [x, y] = polar(52, a);
        return (
          <rect
            key={a}
            x={round(x - 6)}
            y={round(y - 11)}
            width={12}
            height={22}
            rx={5}
            fill="var(--primary)"
            stroke="#1e293b"
            strokeWidth={1.5}
          />
        );
      })}
      <path
        d="M-50 8 C-48 26 -36 36 -18 38"
        stroke="#334155"
        strokeWidth={2.5}
        fill="none"
        strokeLinecap="round"
      />
      <circle cx={-16} cy={38} r={3.4} fill="#1e293b" />
      <circle {...anim("blink")} cx={40} cy={-52} r={3.5} fill="#22c55e" />
    </>
  );
}

export const DEV_FRAMES: Record<string, SeasonalFrameArt> = {
  "moldura-fone": fone,
  "moldura-0x100": (id) => (
    <>
      {ring("var(--primary)", 1, "1 3")}
      {textRing(
        `${id}-text`,
        "100000000 · 0x100 · 256 · 100000000 · 0x100 · 256 ·",
        "var(--primary)",
      )}
    </>
  ),
  "moldura-terminal": (id) => (
    <>
      {ring("#0f172a", 9, "", 61)}
      {textRing(`${id}-text`, TERMINAL_PROMPT, "#4ade80", 6.4)}
      <rect {...anim("blink")} x={-3} y={-72} width={6} height={7} fill="#4ade80" />
    </>
  ),
  "moldura-toalha": (id) => (
    <>
      {textRing(
        `${id}-text`,
        "não entre em pânico · 42 · não entre em pânico · 42 ·",
        "#0284c7",
        6.6,
        "Manrope, ui-sans-serif, sans-serif",
        62,
        "spin-rev",
      )}
      {perch("toalha", 135, 56, 1.6, 20)}
    </>
  ),
  "moldura-d20": () => orbit(["d20"], 3, 64, 0.95, { spin: "spin", each: "twinkle", stagger: 0.5 }),
  "moldura-pixel": () => pixelRing(["#a78bfa", "#6746f5", "#22d3ee", "#f472b6", "#facc15"]),
  "moldura-bugs": () => orbit(["bug"], 6, 61, 0.65, { spin: "spin-slow", rotOff: 90 }),
};
