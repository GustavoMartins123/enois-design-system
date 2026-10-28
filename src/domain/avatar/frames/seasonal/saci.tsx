import type { SeasonalFrameArt } from "../../../../types/domain/avatar/seasonal-frame-art.js";

import { anim, arc, hat, orbit, perch, ring, risers } from "./frame-kit.js";

/** Dashed wind arcs, spinning; the Saci's whirlwind. */
function whirl(arcs: readonly (readonly [number, number, number, string, number])[]) {
  return (
    <g {...anim("spin")}>
      {arcs.map(([r, a, b, c, w]) => (
        <path
          key={r}
          d={arc(r, a, b)}
          stroke={c}
          strokeWidth={w}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${w * 6} ${w * 2.5}`}
        />
      ))}
    </g>
  );
}

export const SACI_FRAMES: Record<string, SeasonalFrameArt> = {
  "moldura-redemoinho": () => (
    <>
      {whirl([
        [56, 0, 210, "#16a34a", 2.4],
        [62, 120, 320, "#65a30d", 1.7],
        [68, 240, 400, "#15803d", 1.2],
      ])}
      {orbit(["folha", "folhaSeca"], 4, 63, 0.55, { spin: "spin-fast", jitter: 10, seed: 4 })}
      {perch("carapuca", 36, 56, 1.25, 34)}
    </>
  ),
  "moldura-carapuca": () => (
    <>
      {ring("#dc2626", 1.4, "2 5")}
      {hat("carapuca", 2.3)}
    </>
  ),
  "moldura-cachimbo": () => (
    <>
      {perch("cachimbo", 128, 58, 1.7)}
      {risers(["fumaca"], 5, 9, 0.8, [36, 56], [24, 40])}
    </>
  ),
  "moldura-folhas": () =>
    orbit(["folha", "folhaSeca", "folhaEscura"], 11, 62, 0.65, {
      spin: "spin-fast",
      jitter: 10,
      seed: 6,
    }),
  "moldura-mata": () =>
    orbit(["folhaEscura", "folha"], 22, 56, 0.7, { spin: "", each: "sway", stagger: 0.15 }),
  "moldura-saci-completo": () => (
    <>
      {whirl([
        [60, 0, 210, "#16a34a", 2.2],
        [67, 150, 350, "#65a30d", 1.5],
      ])}
      {hat("carapuca", 2.1)}
      {perch("cachimbo", 128, 58, 1.5)}
      {risers(["fumaca"], 4, 3, 0.7, [36, 52], [24, 38])}
    </>
  ),
};
