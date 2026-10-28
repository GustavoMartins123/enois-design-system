import type { SeasonalFrameArt } from "../../../../types/domain/avatar/seasonal-frame-art.js";
import { polar, round, seededRandom } from "../../avatar-frames.js";

import { anim, fallers, keyed, orbit, ring, wave } from "./frame-kit.js";

const CONFETTI = ["#ec4899", "#f59e0b", "#22c55e", "#3b82f6", "#a855f7"];

/** Three streamers spinning and loose confetti twinkling around. */
function serpentina() {
  const rnd = seededRandom(7);
  const confetti = Array.from({ length: 16 }, (_, i) => {
    const [x, y] = polar(54 + rnd() * 20, rnd() * 360);
    const turn = round(rnd() * 180);
    return (
      <g transform={`translate(${x} ${y}) rotate(${turn})`}>
        <rect
          {...anim("twinkle", -rnd() * 2)}
          x={-1.4}
          y={-3}
          width={2.8}
          height={6}
          rx={0.8}
          fill={CONFETTI[i % 5]}
        />
      </g>
    );
  });
  return (
    <>
      <g {...anim("spin-slow")}>
        {keyed(["#ec4899", "#f59e0b", "#22c55e"].map((c, i) => wave(c, { phase: i * 120 })))}
      </g>
      {keyed(confetti)}
    </>
  );
}

/** The avatar becomes the drum skin; the jingles spin around it. */
function pandeiro() {
  return (
    <>
      {ring("#b45309", 5, "", 54)}
      <g {...anim("spin-slow")}>
        {Array.from({ length: 8 }, (_, i) => {
          const [x, y] = polar(54, i * 45);
          return (
            <g key={i} transform={`translate(${x} ${y}) rotate(${i * 45})`}>
              <rect x={-4} y={-2} width={8} height={4} rx={1} fill="#78350f" />
              <circle cx={-2.2} r={2.1} fill="#fcd34d" stroke="#92400e" strokeWidth={0.6} />
              <circle cx={2.2} r={2.1} fill="#fcd34d" stroke="#92400e" strokeWidth={0.6} />
            </g>
          );
        })}
      </g>
    </>
  );
}

export const CARNAVAL_FRAMES: Record<string, SeasonalFrameArt> = {
  "moldura-serpentina": serpentina,
  "moldura-confete": () => (
    <>
      {ring("#ec4899", 1.4, "1 5")}
      {fallers(["confete"], 12, 51, 0.6, "drift")}
    </>
  ),
  "moldura-plumas": () =>
    orbit(["pluma", "plumaAzul", "plumaAmarela"], 11, 60, 1.35, {
      spin: "",
      arc: [-85, 85],
      rotOff: 45,
      each: "sway",
      stagger: 0.25,
    }),
  "moldura-frevo": () =>
    orbit(["sombrinha"], 4, 64, 0.95, { spin: "spin", each: "sway", stagger: 0.5 }),
  "moldura-purpurina": () =>
    orbit(["brilho", "brilhoDourado"], 14, 62, 0.45, {
      spin: "spin-slow",
      each: "twinkle",
      jitter: 14,
      seed: 9,
      stagger: 0.3,
    }),
  "moldura-pandeiro": pandeiro,
};
