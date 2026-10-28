import type { SeasonalFrameArt } from "../../../../types/domain/avatar/seasonal-frame-art.js";

import { anim, bursts, orbit, place, wave } from "./frame-kit.js";

export const REVEILLON_FRAMES: Record<string, SeasonalFrameArt> = {
  "moldura-fogos": () => bursts(["fogos", "fogosVerde"], 7, 41, 1.1),
  "moldura-sete-ondas": () => (
    <g {...anim("spin-slow")}>
      {wave("#38bdf8", { r: 56, amp: 3, freq: 7 })}
      {wave("#7dd3fc", { r: 62, amp: 3, freq: 7, phase: 90 })}
      {wave("#0ea5e9", { r: 68, amp: 3, freq: 7, phase: 180, w: 1.6 })}
    </g>
  ),
  "moldura-meia-noite": () => (
    <>
      {place("relogio", 0, -62, 1.5)}
      {orbit(["brilhoDourado"], 8, 62, 0.45, {
        spin: "spin-slow",
        each: "twinkle",
        arc: [35, 325],
      })}
    </>
  ),
  "moldura-uvas": () => orbit(["uva"], 12, 61, 0.55, { spin: "spin-slow" }),
};
